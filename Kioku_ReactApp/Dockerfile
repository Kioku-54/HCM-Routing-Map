FROM node:lts-alpine AS builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn

RUN yarn start
