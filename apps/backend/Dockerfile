# Etapa 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install --immutable
RUN yarn build

# Etapa 2: Execução
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install --production --immutable
CMD ["node", "dist/main.js"]