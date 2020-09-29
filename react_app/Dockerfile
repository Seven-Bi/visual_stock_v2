FROM node:14

WORKDIR /usr/react_app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

COPY . .


EXPOSE 8081
