FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:18-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY app.js ./
COPY controllers ./controllers
COPY models ./models
COPY repositories ./repositories
COPY routes ./routes
COPY .env ./
COPY config ./config

EXPOSE 3002

CMD ["node", "app.js"]