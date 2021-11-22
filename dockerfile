FROM node:16.12.0-buster-slim as client
RUN mkdir /project
WORKDIR /project
CMD npm install && npm run start

FROM node:16.12.0-buster-slim as s_express
RUN mkdir /project
WORKDIR /project
CMD npm install && npm run dev

FROM node:16.12.0-buster-slim as s_graphql
RUN mkdir /project
WORKDIR /project
CMD npm install && npm run dev
