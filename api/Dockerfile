# base image 
FROM node:22-alpine

# working directory
WORKDIR /app

# only packagejson to keep image light
COPY package*.json ./

# backend dependencies
RUN npm install

# where the container will listen from
EXPOSE 4000

# run command
CMD ["npm", "run", "dev"]