<h1 align="center">Pagination Example API</h1>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)
- [Docker](#docker)

## Description

When the program start a message will be shown:

```
  App is listening...
  App Name: pagination-example-api
  Version: 0.0.1
  Port: 3000
  Username: oneill
```

For testing the app is working properly, there is a `ping` middleware:

```
http://localhost:3000/api/ping
```

and get the following response:

```json
{
  "name": "pagination-example-api",
  "port": 3000,
  "version": "1.0.0"
}
```

on every request the program log it to a file and the console, using `winston` and `winston-daily-rotate-file`, for example:

```
[19:00:00] INFO: GET /api/ping 200 2ms
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

To run the nestjs project with docker create a `Dockerfile`:

```Dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "run", "start:prod"]
```

To build the docker image run:

```
docker build -t pagination-example-api .
```

To run the image:

```
docker run -d -p 3000:3000 pagination-example-api
```

If a local mongodb need to be connected to the app use:
```
docker run -p 3000:3000 -e DB_URL=mongodb://host.docker.internal:27017/db_name -d pagination-example-api
```
