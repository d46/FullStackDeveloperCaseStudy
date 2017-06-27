FROM node:latest

WORKDIR /ui
COPY . /ui

RUN rm -rf node_modules
RUN npm i 
RUN npm install -g gulp-cli
RUN npm install gulp
