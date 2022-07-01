FROM node

WORKDIR /app

ENV NODE_ENV=production

COPY /client/package.json /app/

RUN npm install

COPY /client /app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]