FROM node:18.19.1-buster

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Variables de entorno para crypto
ENV NODE_OPTIONS="--experimental-modules --experimental-specifier-resolution=node --experimental-global-webcrypto"

# Copiar archivos de package
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir
RUN npm run build

EXPOSE 3000

CMD ["node", "--experimental-modules", "--experimental-global-webcrypto", "dist/main.js"]