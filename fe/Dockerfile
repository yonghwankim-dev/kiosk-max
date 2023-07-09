# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ./package.json /package.json

RUN npm install --production

COPY . .

CMD ["yarn", "start"]
