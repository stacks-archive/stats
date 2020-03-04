FROM node:12.16.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn
COPY . /usr/src/app/
RUN yarn lerna bootstrap
RUN yarn lerna run build

ENV NODE_ENV="production"
EXPOSE 5555
CMD ["yarn", "prod:server"]