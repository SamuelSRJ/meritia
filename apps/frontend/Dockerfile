# Builder
FROM node:24-slim AS builder
WORKDIR /app

COPY .yarn/ .yarn/
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

COPY apps/frontend ./apps/frontend

RUN corepack enable && yarn install

RUN yarn workspace frontend build

# Runtime
FROM node:24-slim
WORKDIR /app

# Instala serve para servir arquivos estáticos
RUN npm install -g serve

COPY --from=builder /app/apps/frontend/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]