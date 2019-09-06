FROM node:8

WORKDIR /opt/personal-dashboard/api

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

CMD ["node", "server"]