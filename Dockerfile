FROM node:18-alpine
WORKDIR /home
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "production" ]