# Base deps
FROM node:24-slim AS base
WORKDIR /app

COPY .yarn/ .yarn/
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend ./apps/frontend

RUN corepack enable && yarn install --immutable

# Builder
FROM node:24-slim AS builder
WORKDIR /app

COPY --from=base /app /app

COPY apps/backend ./apps/backend

RUN corepack enable
RUN yarn workspace backend build

RUN mkdir -p apps/backend/dist/fonts && \
    cp -r apps/backend/fonts/* apps/backend/dist/fonts

# Production
FROM node:24-slim AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/backend/dist ./dist

COPY apps/backend/package.json ./

RUN corepack enable && yarn install --immutable --production

EXPOSE 4000
CMD ["node", "dist/main.js"]