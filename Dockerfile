FROM node:8

WORKDIR /opt/personal-dashboard/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]