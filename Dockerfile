FROM node:14-slim as builder
WORKDIR /app

ENV PIXIV_API_ENTRY /api

COPY . .
RUN yarn install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY build/docker-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
