# frontend/Dockerfile (multi-stage)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Env públicas para que Next las inyecte en el bundle
ARG NEXT_PUBLIC_RB_APP_ID
ARG NEXT_PUBLIC_RB_API_KEY
ENV NEXT_PUBLIC_RB_APP_ID=$NEXT_PUBLIC_RB_APP_ID
ENV NEXT_PUBLIC_RB_API_KEY=$NEXT_PUBLIC_RB_API_KEY

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copia sólo lo necesario para correr
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]
