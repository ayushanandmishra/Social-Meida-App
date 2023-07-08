FROM node:latest

ENV NODE_ENV=node-app

WORKDIR /usr/src/server

COPY package.json .
COPY package-lock.json .

RUN npm install


COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]