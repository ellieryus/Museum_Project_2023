FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["node", "/app/index.js"]
