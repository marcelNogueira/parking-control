FROM node:12.18-alpine3.11 AS base
WORKDIR /usr/src/parking-control
RUN apk update \
  && apk add bash \
  && rm -rf /var/cache/apk/*

COPY prisma ./prisma
COPY package.json .
COPY .env .env
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
