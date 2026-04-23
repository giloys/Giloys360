# ─── Stage 1: Build ───────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Inject env vars at build time (passed via docker build-args)
ARG REACT_SERVER_URL
ARG REACT_CLIENT_URL
ARG MY_ENV

ENV VITE_SERVER_URL=$REACT_SERVER_URL
ENV VITE_CLIENT_URL=$REACT_CLIENT_URL
ENV VITE_ENV=$MY_ENV

RUN npm run build

# ─── Stage 2: Serve with Nginx ────────────────────────────
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]