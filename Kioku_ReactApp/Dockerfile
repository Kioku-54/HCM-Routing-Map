FROM node:alpine

WORKDIR /app

COPY /Kioku_ReactApp/package.json ./Kioku_ReactApp/yarn.lock ./

RUN yarn

COPY ./Kioku_ReactApp .

CMD ["yarn", "dev", "--debug"]