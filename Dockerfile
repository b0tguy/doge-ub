FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm prune --omit=dev


FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=2345

COPY --from=builder /app /app

EXPOSE 2345

CMD ["node", "server.js"]
