FROM node:14
WORKDIR /usr/react_app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["node", "server.js"]
