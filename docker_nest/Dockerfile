FROM node:20

WORKDIR /root/demo_nest

COPY package.json .

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY . .

RUN yarn prisma generate --schema src/prisma/schema.prisma  

RUN yarn run build

CMD ["yarn" ,"start:prod"]

# docker build . -t img-nest