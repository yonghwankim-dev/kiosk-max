# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app/fe

COPY ./package.json ./

RUN npm install

COPY . ./

EXPOSE 3000
