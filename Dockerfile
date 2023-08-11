FROM node:16.20.1-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod --silent
COPY . /app
RUN npm run build

FROM nginx:1.16.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]