FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm list mongoose 

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
