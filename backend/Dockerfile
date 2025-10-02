# backend/Dockerfile
# Este archivo le dice a Docker cómo construir tu aplicación Strapi.

# Usa una imagen base de Node.js ligera. Alpine es una buena opción.
# Asegúrate de que la versión de Node sea compatible con tu versión de Strapi (v18 es una opción segura).
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /opt/app

# Copia los archivos de dependencias primero para aprovechar el caché de Docker.
# Si estos archivos no cambian, Docker no volverá a instalar las dependencias.
# COPY package.json ./
# COPY yarn.lock ./
# O si usas npm:
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias del proyecto.
# Usamos --frozen-lockfile para asegurar instalaciones consistentes.
# RUN yarn install --frozen-lockfile
# O si usas npm:
RUN npm ci

# Copia el resto de los archivos de tu aplicación al directorio de trabajo.
COPY . .

# Establece el entorno a desarrollo
ENV NODE_ENV=development

# Strapi requiere ser "construido" para que el panel de administración funcione.
# RUN yarn build
# O si usas npm:
RUN npm run build

# Expone el puerto por defecto en el que corre Strapi
EXPOSE 1337

# El comando para iniciar la aplicación en modo de desarrollo.
# Esto permite que Strapi se recargue automáticamente con los cambios.
# CMD ["yarn", "develop"]
# O si usas npm:
CMD ["npm", "run", "develop"]