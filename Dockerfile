# ---------- Base Stage ----------
FROM node:22-alpine AS base
WORKDIR /app

# Disable telemetry and set production env
# ENV NEXT_TELEMETRY_DISABLED=true \
#     NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=true

COPY package*.json ./
RUN npm ci

# ---------- Build Stage ----------
FROM base AS builder

COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:22-alpine AS runner
WORKDIR /app

# Set env in proper format
ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=true

COPY package.json ./

RUN npm ci --omit=dev && \
    npm prune --production && \
    npm cache clean --force
  
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
# If your standalone output needs static files from .next/static
COPY --from=builder /app/.next/static ./.next/static

# Copy only necessary artifacts from builder
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/package.json ./package.json


EXPOSE 3000
CMD ["npm", "start"]
