# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Nur package-Dateien zuerst kopieren, um Caching zu nutzen
COPY package*.json ./
RUN npm ci

# Restliche App kopieren und builden
COPY . .
RUN npm run build --prod

# 2. Serve Stage (mit Nginx)
FROM nginx:alpine
# Angular build output nach Nginx kopieren
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
