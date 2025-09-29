# Install dependencies only when needed
FROM node:22-alpine AS deps
WORKDIR /app

ARG BUILD_TARGET

# 루트 package.json과 target별 package.json만 복사
COPY package*.json ./
COPY packages/core/package*.json ./packages/core/
COPY packages/${BUILD_TARGET}/package*.json ./packages/${BUILD_TARGET}/

# 필요한 의존성만 설치
RUN npm config set fetch-timeout 60000
RUN npm ci

# Rebuild the source code only when needed
FROM node:22-alpine AS builder
WORKDIR /app

ARG BUILD_TARGET

COPY --from=deps /app/node_modules ./node_modules
# core와 target 소스만 복사
COPY packages/core/ ./packages/core/
COPY packages/${BUILD_TARGET}/ ./packages/${BUILD_TARGET}/
COPY package*.json ./

# 해당 target만 빌드
RUN npm run build:${BUILD_TARGET}

# Production image - serve static files
FROM node:22-alpine AS runner
WORKDIR /app

# serve 설치
RUN npm install -g serve

ARG BUILD_TARGET
COPY --from=builder /app/packages/${BUILD_TARGET}/dist ./dist

EXPOSE 4000
CMD ["serve", "-s", "dist", "-l", "4000"]