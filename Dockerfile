FROM node:18-alpine
WORKDIR /home
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]