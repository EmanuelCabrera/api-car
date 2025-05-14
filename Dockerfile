# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias necesarias para MySQL y OpenSSL
RUN apk add --no-cache python3 make g++ openssl openssl-dev

# Copiar archivos de dependencias
COPY package*.json ./
COPY yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el código fuente
COPY . .

# Generar el cliente Prisma
RUN yarn prisma generate

# Construir la aplicación
RUN yarn build || (echo "Build failed" && exit 1)

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Instalar dependencias necesarias para MySQL y OpenSSL
RUN apk add --no-cache python3 make g++ openssl openssl-dev bash netcat-openbsd

# Instalar NestJS CLI globalmente
RUN yarn global add @nestjs/cli

# Instalar node-crypto
RUN yarn add node-crypto

# Copiar archivos de dependencias
COPY package*.json ./
COPY yarn.lock ./

# Instalar solo dependencias de producción
RUN yarn install --frozen-lockfile --production

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Crear directorio para el archivo de estado de seeds
RUN mkdir -p /app/data && \
    touch /app/data/.seeds_completed

# Crear usuario no root y asignar permisos
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Cambiar al usuario no root
USER appuser

# Exponer el puerto
EXPOSE 3000