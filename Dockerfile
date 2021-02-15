FROM node:14.7.0-alpine AS development

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development
RUN npm run build

COPY . .

FROM node:14.7.0-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/app"]
