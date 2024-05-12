<h1 align="center">Pagination Example UI</h1>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Usage](#usage)
- [Docker](#docker)

## Usage

To run the app:

```
npm start
```

To build the application:

```
npm run build
```

The other `ng` command also work.

## Docker

To run the angular project with docker create a `Dockerfile`:

```Dockerfile
# Set the base image to use for the container
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app
RUN npm run build

# Start with a fresh image
FROM nginx:1.25.3-alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy the Angular app files to the container
COPY --from=builder /app/dist/browser/* /usr/share/nginx/html/

# Set the command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html index.htm;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

To build the docker image run:

```
docker build -t pagination-example-ui .
```

To run the image:

```
docker run -d -p 8080:80 pagination-example-ui
```
