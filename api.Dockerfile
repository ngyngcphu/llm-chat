ARG NODE_VERSION=18.13.0

################## Stage 1 ##################
FROM node:${NODE_VERSION}-alpine as development
WORKDIR /api

COPY package.json yarn.lock tsconfig.json tsconfig.compile.json jest.config.js ./
COPY ./api ./api
COPY ./prisma ./prisma

RUN yarn install --prod && yarn db:generate
RUN yarn add -D jest @types/jest ts-jest

RUN yarn build

COPY ./prisma ./dist/prisma

################## Stage 2 ##################
FROM node:${NODE_VERSION}-alpine as production
WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node --from=development /app/dist .
COPY --chown=node:node --from=development /app/node_modules node_modules

EXPOSE 8080
CMD yarn db:deploy && node src/index.js