<h1 align="center">Angular Starter Kit</h1>

<p align="center" width="100%">
    <a href="#"><img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" title="Angular"/></a>
    <a href="#"><img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white" title="SASS"/></a>
    <a href="#"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" title="TypeScript"/></a>
    <a href="#"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" title="Jest"/></a>
    <a href="#"><img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" title="Cypress"/></a>
    <a href="#"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" title="Docker"/></a>
    <a href="#"><img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" title="Nginx"/></a>
    <a href="#"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" title="Vite"/></a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [File Structure](#file-structure)
- [Docker](#docker)

## Description

This is an Angular template to create an Angular application with ease.

The template is a standalone component based template.

It include `Jest` and `Cypress` for testing.

`Vite` for builds and `Docker` and `Nginx` for deployment.

To run the app:

```
npm start
```

To build the application:

```
npm run build
```

The other `ng` command also work.

## File Structure

```
.
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptors.ts
│   │   │   │   └── global-error.interceptor.ts
│   │   │   └── services/
│   │   │       └── auth.service.ts
│   │   ├── error/
│   │   │   ├── error.component.html
│   │   │   ├── error.component.scss
│   │   │   └── error.component.ts
│   │   ├── pages/
│   │   │   ├── pages.component.cy.ts
│   │   │   ├── pages.component.html
│   │   │   ├── pages.component.scss
│   │   │   ├── pages.component.ts
│   │   │   └── pages.routes.ts
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   └── .gitkeep
│   ├── environments/
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── .dockerignore
├── .editorconfig
├── .gitignore
├── angular.json
├── cypress.config.ts
├── Dockerfile
├── LICENCE
├── nginx.conf
├── package-lock.json
├── package.json
├── README.md
├── setup-jest.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

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
docker build -t angular-starter-kit .
```

To run the image:

```
docker run -d -p 8080:80 angular-starter-kit
```
