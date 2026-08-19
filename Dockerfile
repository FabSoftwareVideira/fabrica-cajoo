# ─── base ────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ─── dev (vite dev server com hot reload) ─────────────────────────────────────
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ─── build (compila o frontend para produção) ─────────────────────────────────
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# ─── prod ──────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS prod
ARG APP_VERSION=prod
ARG APP_ENV=production
ENV NODE_ENV=production \
    APP_VERSION=${APP_VERSION} \
    APP_ENV=${APP_ENV}

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server

# Usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "server/index.js"]
