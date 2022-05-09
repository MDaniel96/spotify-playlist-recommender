FROM node:16.14.0-alpine3.15
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --production

COPY src /app/src
RUN npm run test:build

EXPOSE 3000
CMD [ "node", "./dist/app.js" ]

