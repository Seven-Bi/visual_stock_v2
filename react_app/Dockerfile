FROM node:14 AS builder
WORKDIR /usr/react_app
COPY . .
RUN npm install
RUN npm run-script build

FROM node:14
RUN npm install -g serve
WORKDIR /usr/react_app
COPY --from=builder /usr/react_app/build .
CMD ["serve", "-p", "80", "-s", "."]
