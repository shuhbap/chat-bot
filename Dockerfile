FROM node:slim

WORKDIR /qr

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["node", "index.js"]
