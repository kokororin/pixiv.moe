FROM node:14-slim as builder
WORKDIR /app

COPY . .
RUN yarn install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
