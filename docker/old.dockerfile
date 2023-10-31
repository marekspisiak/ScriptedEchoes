FROM node:18
WORKDIR /usr/src/app
RUN npm install -g express
COPY package*.json ./
RUN npm install
COPY ../server.js ./
COPY ../public ./public
COPY ../src ./src
RUN npm run build
EXPOSE 3000
CMD [ "node", "server.js" ]
