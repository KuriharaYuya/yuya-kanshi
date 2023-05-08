FROM node:lts-bullseye-slim

WORKDIR /usr/src/app

RUN npm install -g npm@9.4.1