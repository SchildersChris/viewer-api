FROM node:14.7.0-alpine AS development
WORKDIR /app

COPY . .

RUN npm install
RUN npm run clean
RUN npm run build

FROM node:14.7.0-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=development ./app/dist ./dist

COPY package* ./

RUN npm install --production
CMD npm run start:prod
