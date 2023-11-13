FROM node:14

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

COPY app/index.js ./

CMD [ "nodemon", "index.js" ]