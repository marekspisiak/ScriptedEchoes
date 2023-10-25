# Vychádzame z oficiálneho Node.js obrazu
FROM node:18

# Nastavíme pracovný adresár v kontajneri
WORKDIR /usr/src/app

# Nainštalujeme globálne závislosti
RUN npm install -g express

# Kopírujeme package.json a package-lock.json (ak existuje) do kontajnera
COPY package*.json ./

# Nainštalujeme závislosti pre server
RUN npm install

# Kopírujeme server.js do kontajnera
COPY server.js ./

# Kopírujeme buildovanú React aplikáciu do kontajnera
COPY build ./build

# Nastavíme port, na ktorom bude server počúvať
EXPOSE 3000

# Spustíme server
CMD [ "node", "server.js" ]
