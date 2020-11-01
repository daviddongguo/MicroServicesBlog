FROM node:apline

ENV CI=true

WORDDIR /app
COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn", "start"]

