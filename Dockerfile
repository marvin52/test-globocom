FROM node:slim

WORKDIR /usr/app

COPY . .

RUN npm install

ENTRYPOINT npm run start