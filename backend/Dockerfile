# Stage 1: Build
FROM node:18-alpine AS build

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Abhängigkeiten kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install --legacy-peer-deps

# Rest des Codes kopieren
COPY . .

# NestJS bauen
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Nur production dependencies installieren
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Build vom vorherigen Stage kopieren
COPY --from=build /app/dist ./dist

# Port exponieren
EXPOSE 3000

# Befehl zum Starten
CMD ["node", "dist/main"]
