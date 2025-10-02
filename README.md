Proyecto Portal BNDC
Este repositorio contiene el código fuente y la configuración para la aplicación web de la Biblioteca Nacional Digital de Colombia (BNDC), construida con Nginx, Node.js, Next.js, TypeScript, Tailwind CSS, React Bricks, Strapi y PostgreSQL, todo orquestado con Docker.

1. Prerrequisitos
Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

Git: Para clonar el repositorio.

Docker: Para crear y gestionar los contenedores.

Docker Compose: Para orquestar los servicios definidos en docker-compose.yml.

Node.js y npm: Para inicializar los proyectos de Next.js y Strapi.

2. Estructura del Proyecto
/portal-bndc
├── backend/
│   ├── Dockerfile       # <--- Archivo a crear
│   └── ...
├── frontend/
│   ├── Dockerfile       # <--- Archivo a crear
│   └── ...
├── nginx/
│   └── nginx.conf
├── .env
└── docker-compose.yml

3. Pasos de Instalación y Configuración
Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

Paso 1: Clonar el Repositorio
Abre tu terminal y ejecuta el siguiente comando para clonar tu repositorio:

git clone https://github.com/ingcharris/portal-bndc.git
cd portal-bndc

Paso 2: Crear el Archivo de Variables de Entorno Principal
Crea un archivo llamado .env en la raíz del proyecto. Este es para Docker.

# Variables de la Base de Datos PostgreSQL
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=strapi_password

# Variables de Strapi (¡MUY IMPORTANTE!)
# Genera estas claves con los comandos indicados y pégalas aquí.
APP_KEYS=tu_app_key_1,tu_app_key_2
API_TOKEN_SALT=tu_api_token_salt
ADMIN_JWT_SECRET=tu_admin_jwt_secret
JWT_SECRET=tu_jwt_secret

Paso 2.5: Crear los Archivos Dockerfile
Este es un paso crucial. Debes crear un archivo llamado Dockerfile dentro de la carpeta frontend y otro con el mismo nombre dentro de la carpeta backend. Utiliza el contenido proporcionado en los bloques de código.

Crea el archivo: frontend/Dockerfile

Crea el archivo: backend/Dockerfile

Paso 3: Inicializar el Backend (Strapi)
3.1. Limpieza y preparación del directorio

# Estando en la carpeta raíz del proyecto (portal-bndc)
rm -rf backend
mkdir backend
cd backend

3.2. Crear el proyecto Strapi con SQLite (temporalmente)

# Estando dentro de la carpeta 'backend' ahora vacía
npx create-strapi-app@latest .

Cuando pregunte Choose your installation type, selecciona Custom (manual settings).

Cuando pregunte Choose your default database client, selecciona SQLite.

Para el resto de preguntas, puedes presionar Enter para aceptar los valores por defecto.

Cuando pregunte Please log in or sign up?, selecciona Skip.

3.3. Configurar la conexión a PostgreSQL para Docker

Sobrescribe el contenido del archivo backend/config/database.js con lo siguiente:

const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi_db'),
      user: env('DATABASE_USERNAME', 'strapi_user'),
      password: env('DATABASE_PASSWORD', 'strapi_password'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    debug: false,
  },
});

3.4. Regresar a la carpeta raíz

cd ..

Paso 4: Inicializar el Frontend (Next.js)
cd frontend
npx -y create-next-app@latest . --typescript --tailwind --eslint
# Sigue las instrucciones de la CLI.

4.1. Configuración para Docker

Para que Next.js funcione correctamente dentro de Docker, abre el archivo next.config.mjs que se creó dentro de la carpeta frontend y añade la línea output: 'standalone', dentro del objeto de configuración. Debería quedar así:

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <--- AÑADE ESTA LÍNEA
};

export default nextConfig;

4.2. Regresar a la carpeta raíz

cd ..

Paso 5: Levantar los Servicios con Docker Compose
Ahora sí, con los archivos Dockerfile en su lugar, inicia la aplicación.

docker-compose up --build

4. Acceso a la Aplicación
Portal Web (Frontend): http://localhost

Panel de Administración de Strapi: http://localhost/admin

API de Strapi: http://localhost/api/...