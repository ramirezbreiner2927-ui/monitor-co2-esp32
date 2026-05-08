# 🌿 Monitor CO₂ con ESP32

Proyecto de monitoreo de Dióxido de Carbono en tiempo real usando un sensor MQ135 y un ESP32, con dashboard web y control remoto del LED integrado.

## 👥 Equipo

| Nombre | Rol |
|---|---|
| Breiner Ramirez | Programador de hardware |
| Luis Bertiz | Maquetador de interfaces |
| Joseph Cordoba | Integrador de APIs |
| Camilo Herrera | Administrador de bases de datos |

## 🛠️ Tecnologías

- **Hardware:** ESP32 + Sensor MQ135
- **Backend:** Node.js + Express + MongoDB
- **Frontend:** HTML, CSS, Chart.js
- **Auth:** JWT + bcrypt

## 📁 Estructura del proyecto

```
api-esp32/
├── public/
│   ├── index.html       # Dashboard principal
│   ├── login.html       # Inicio de sesión
│   ├── register.html    # Registro de usuario
│   └── about.html       # Información del equipo
├── index.js             # API REST (servidor Node)
├── Co2file.ino          # Código del ESP32
├── .env.example         # Variables de entorno de ejemplo
├── .gitignore
└── README.md
```

## ⚙️ Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/monitor-co2-esp32.git
cd monitor-co2-esp32
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus valores.

### 4. Iniciar el servidor
```bash
node index.js
```

### 5. Configurar el ESP32
Abre `Co2file.ino` en Arduino IDE y actualiza:
```cpp
const char* ssid = "TU_WIFI";
const char* password = "TU_PASSWORD";
const char* serverSensor = "http://IP_DE_TU_PC:3000/sensor";
const char* serverLed    = "http://IP_DE_TU_PC:3000/led/estado";
```

## 🔌 Hardware

| Componente | Pin ESP32 |
|---|---|
| Sensor MQ135 (AOUT) | GPIO 34 |
| LED integrado azul | GPIO 2 |

## 🚦 Niveles de CO₂

| Nivel | Estado |
|---|---|
| < 800 ppm | ✅ Aire limpio |
| 800 - 1200 ppm | ⚠️ Calidad moderada |
| > 1200 ppm | 🚨 Aire contaminado |

## 📡 Endpoints de la API

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | /register | Registrar usuario | No |
| POST | /login | Iniciar sesión | No |
| POST | /sensor | Recibir dato del ESP32 | No |
| GET | /datos | Obtener últimos 50 registros | Sí |
| POST | /led/on | Encender LED | Sí |
| POST | /led/off | Apagar LED | Sí |
| GET | /led/estado | Estado actual del LED (para ESP32) | No |
