ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine as development
WORKDIR /ui
COPY package.json yarn.lock tsconfig.json tsconfig.node.json vite.config.ts index.html *.config.cjs ./
COPY ./ui ./ui
RUN yarn install && yarn build

FROM node:${NODE_VERSION}-alpine as production
WORKDIR /ui
COPY --from=development /ui/dist .
RUN yarn global add serve

EXPOSE 3000
CMD serve -s . -l 3000