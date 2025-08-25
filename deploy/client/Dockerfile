# get the base node image
FROM node:alpine as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY package-lock.json package.json .

# install npm dependencies
RUN npm ci

COPY . .
# build the folder
RUN npm run build

# Handle Nginx
FROM nginx:alpine as production
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]