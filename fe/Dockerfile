# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app/fe

COPY ["package.json", "./app/fe"]

RUN npm install --production

COPY . .

CMD ["yarn", "start"]
