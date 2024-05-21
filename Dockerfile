# Utiliza una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en la imagen de Docker
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm","run", "dev"]