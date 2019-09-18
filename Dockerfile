FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "node", "index.js"]

