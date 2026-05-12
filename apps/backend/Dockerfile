# Build stage
FROM node:24-slim AS builder
WORKDIR /app

# Copy workspace configuration
COPY .yarn .yarn/
COPY .yarnrc.yml .
COPY package.json yarn.lock ./

# Copy backend source
COPY apps/backend ./apps/backend

# Install dependencies
RUN corepack enable && yarn install

# Build backend
WORKDIR /app/apps/backend
RUN yarn build

# Production stage
FROM node:24-slim AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/apps/backend/dist ./dist
COPY apps/backend/package.json ./

# Create fonts directory and copy fonts
RUN mkdir -p dist/fonts
COPY apps/backend/fonts ./dist/fonts

# Install production dependencies
RUN corepack enable && yarn install --immutable --production

EXPOSE 4000
CMD ["node", "dist/main.js"]