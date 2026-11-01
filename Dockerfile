# ─── base ────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ─── dev (vite dev server com hot reload) ─────────────────────────────────────
FROM base AS dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ─── build (compila o frontend para produção) ─────────────────────────────────
FROM base AS build
RUN npm ci
COPY . .
RUN npm run typecheck && npm run build

# SQL e executor acompanham o checkout em uma imagem independente do banco.
FROM base AS migrate
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY scripts/migrate.js ./scripts/migrate.js
COPY db/migrations ./db/migrations
USER node
CMD ["node", "scripts/migrate.js"]

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
COPY scripts/migrate.js ./scripts/migrate.js
COPY db/migrations ./db/migrations

# Usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=90s --retries=6 CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server/index.js"]
