FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Construir el sitio estático de Astro
RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copiar solo lo necesario para ejecutar el preview
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# El script "preview" ya está configurado en package.json para 0.0.0.0:3000
EXPOSE 3000

CMD ["npm", "run", "preview"]
