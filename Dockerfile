FROM node:16.20.0-alpine3.17 as build-stage
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build:develop

FROM nginx:alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]