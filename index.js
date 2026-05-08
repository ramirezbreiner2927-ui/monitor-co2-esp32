require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const SECRET    = process.env.SECRET;
const MONGO_URI = process.env.MONGO_URI;
const PORT      = process.env.PORT || 3000;

// ── Estado del LED en memoria ──────────────────────────
let ledEstado = "on";

mongoose.connect(MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.log(err));

const Sensor = mongoose.model("Sensor", {
  co2: Number,
  fecha: { type: Date, default: Date.now }
});

const User = mongoose.model("User", {
  email: String,
  password: String
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await new User({ email, password: hash }).save();
  res.json({ message: "Usuario registrado" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Usuario no existe" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });
  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No autorizado" });
  try { jwt.verify(token, SECRET); next(); }
  catch { res.status(401).json({ error: "Token inválido" }); }
}

app.post("/sensor", async (req, res) => {
  const { co2 } = req.body;
  await new Sensor({ co2 }).save();
  res.json({ ok: true });
});

app.get("/datos", auth, async (req, res) => {
  const datos = await Sensor.find().sort({ fecha: -1 }).limit(50);
  res.json(datos);
});

app.post("/led/on", auth, (req, res) => {
  ledEstado = "off";
  console.log("💡 LED → ON");
  res.json({ led: "on" });
});

app.post("/led/off", auth, (req, res) => {
  ledEstado = "on";
  console.log("💡 LED → OFF");
  res.json({ led: "off" });
});

app.get("/led/estado", (req, res) => {
  res.json({ led: ledEstado });
});

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
