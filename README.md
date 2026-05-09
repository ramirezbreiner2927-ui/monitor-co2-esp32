# 🌿 Monitor CO₂ con ESP32

## Introducción 
El presente proyecto consiste en el desarrollo de un sistema de monitoreo de dióxido de carbono (CO₂) en tiempo real utilizando un sensor MQ135 y un microcontrolador ESP32. La solución implementada integra tecnologías de Internet de las Cosas (IoT) para capturar, procesar y visualizar datos ambientales mediante un tablero web interactivo accesible para los usuarios.

Además del monitoreo ambiental, el sistema incorpora funcionalidades de control remoto del LED integrado del ESP32, permitiendo la interacción en tiempo real entre la plataforma web y el dispositivo físico. El proyecto fue desarrollado con el propósito de aplicar conocimientos de programación, electrónica y desarrollo web, demostrando la integración eficiente entre hardware y software en sistemas inteligentes conectados.

## Objetivos del Proyecto

### Objetivo General

Desarrollar un sistema IoT de monitoreo de dióxido de carbono (CO₂) en tiempo real utilizando un sensor MQ135 y un ESP32, integrando una plataforma web interactiva para la visualización de datos y el control remoto del dispositivo.

###  Objetivos Específicos

- Implementar la lectura de datos ambientales mediante el sensor MQ135 conectado al ESP32.
- Diseñar un tablero web para visualizar la información del monitoreo en tiempo real.
- Desarrollar un sistema de autenticación de usuarios mediante módulos de login y registro.
- Integrar el control remoto del LED del ESP32 desde la plataforma web.
- Aplicar conceptos de Internet de las Cosas (IoT), programación embebida y desarrollo web en una solución funcional e interactiva.
- Mejorar la experiencia del usuario mediante una interfaz intuitiva y de fácil acceso.

  ###  Objetivo de Documentación

- Elaborar una documentación técnica clara y estructurada que facilite la comprensión, instalación, funcionamiento y mantenimiento del sistema de monitoreo de CO₂ desarrollado.

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

# 🌐 Sitio Web

La plataforma web fue desarrollada con el propósito de permitir la interacción entre los usuarios y el sistema de monitoreo de CO₂ implementado con ESP32. A través de una interfaz intuitiva y dinámica, el sitio web permite visualizar información en tiempo real, gestionar usuarios y controlar funcionalidades del dispositivo de manera remota.


---

## 🔐 Login

El módulo de inicio de sesión fue implementado para permitir el acceso seguro de los usuarios registrados a la plataforma web. Esta funcionalidad garantiza que únicamente usuarios autenticados puedan acceder al dashboard y a las herramientas de control del sistema.

Además, el diseño de la interfaz fue realizado buscando simplicidad y facilidad de uso, proporcionando una experiencia intuitiva para el usuario final.

### 📌 Funcionalidades principales

- Validación de credenciales.
- Acceso seguro al sistema.
- Redirección automática al dashboard.
- Interfaz amigable y responsiva.

### 💻 Fragmento de código

```html
<form class="login-form">
  <input type="email" placeholder="Correo electrónico">
  <input type="password" placeholder="Contraseña">
  <button type="submit">Iniciar sesión</button>
</form>
```

![Login](images/login.png)

## Sign Up

El módulo de registro permite la creación de nuevas cuentas de usuario dentro de la plataforma. Esta funcionalidad facilita el acceso personalizado al sistema y mejora la gestión de usuarios.

El formulario fue diseñado para recopilar información básica y permitir un proceso de registro rápido y sencillo.

📌 Funcionalidades principales
Registro de nuevos usuarios.
Validación de campos.
Creación de cuentas personalizadas.
Interfaz clara y organizada.
## 💻 Fragmento de código
```html
<form class="signup-form">
  <input type="text" placeholder="Nombre">
  <input type="email" placeholder="Correo">
  <input type="password" placeholder="Contraseña">
  <button type="submit">Registrarse</button>
</form>
```
## vista de sign Up
![SignUp](images/signup.png)

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

##  Conclusiones

El desarrollo de este proyecto permitió implementar un sistema funcional de monitoreo de dióxido de carbono (CO₂) en tiempo real mediante el uso del sensor MQ135 y el microcontrolador ESP32, integrando conceptos de Internet de las Cosas (IoT), programación embebida y desarrollo web.

Asimismo, la creación de una plataforma web con módulos de login, registro, dashboard y control remoto del LED permitió fortalecer la interacción entre el usuario y el dispositivo físico, ofreciendo una experiencia más dinámica e intuitiva. La integración de tecnologías como HTML, CSS, JavaScript y ESP32 evidenció la capacidad de desarrollar soluciones tecnológicas conectadas, capaces de combinar hardware y software en un entorno práctico y funcional.
