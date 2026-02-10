FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir el sitio estático de Astro
RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copiar solo lo necesario para servir el sitio estático
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Servimos los archivos estáticos desde /dist en el puerto 3000
EXPOSE 3000

CMD ["npm", "run", "start"]
