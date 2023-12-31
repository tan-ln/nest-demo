FROM node:18

WORKDIR /app

COPY . .
RUN yarn config set registry https://registry.npm.taobao.org/
# RUN yarn

ENV NODE_ENV=dev

EXPOSE 3000

CMD ["npm","run","start:dev"]
