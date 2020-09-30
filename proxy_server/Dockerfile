FROM node:14

WORKDIR /usr/proxy_server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "node", "./src/server.js" ]