---
status: publish
published: true
pubDatetime: 2023-08-03T20:00:00.000Z
title: Building, Deploying, and Managing Docker Images with GitHub Actions
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: peter@peterkellner.net
  url: 'https://peterkellner.net'
author_login: admin

display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
description: This tutorial guides you on how to use Dockerfile, docker-compose, and GitHub Actions for building and deploying applications. It emphasizes the crucial role of DATABASE_URL in the Dockerfile, enabling different connection strings during build and runtime.

---
# Building, Deploying, and Managing Docker Images with GitHub Actions

Hello, I'm Peter Kellner, and today we're going to dive deep into how Docker files and docker-compose work together, how they integrate with GitHub actions, and why they are important for your deployment workflow. I've brought in files from a current website I'm working on to show you how it all works. There may be extra lines of code here you don't need, but I wanted to show you a real-world example.

## Dockerfile & docker-compose.yml

Our journey begins with two files: the Dockerfile and the docker-compose.yml. These are the heart and soul of containerizing an application. The Dockerfile builds our image, and docker-compose.yml sets up the services that use this image.

Let's dissect our Dockerfile first.

```Dockerfile
FROM node:16-alpine AS deps

# Installing npm
RUN npm install -g npm@9.8.1

# Define an ARG variable passed in as --build-arg
ARG DATABASE_URL

# Use the ARG value in the environment variable
ENV DATABASE_URL=$DATABASE_URL

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
COPY package.json /usr/src/
COPY package-lock.json /usr/src/
RUN npm install

# Bundle app source
COPY . /usr/src

# Run Prisma generate
RUN npx prisma generate

RUN npm run build
EXPOSE 3100

CMD ["npm", "start"]
```

This Dockerfile begins by defining the base image (node:16-alpine) and installing npm. Then, an argument `DATABASE_URL` is declared.

The `ARG` instruction defines a variable that users can pass at build-time to the builder with the docker build command. This `DATABASE_URL` will be different when you are building the app and when you are running it. The value of this argument will be passed into the `ENV` instruction, setting up the `DATABASE_URL` environment variable inside the Docker container.

After that, the necessary directories are created, and the app's dependencies are installed. The app's source code is then copied into the Docker container, followed by the generation of Prisma client using `npx prisma generate`. Lastly, the application is built, and the port 3100 is exposed for the app to be accessible.

The `docker-compose.yml` file, on the other hand, configures your application's services, in this case, the `newsfairness` service. It specifies how Docker containers should behave in production.

```yaml
networks:
  web:
    external: true
        
services:
  newsfairness:
    image: ghcr.io/pkellner/newsfairness:latest
    restart: always
    container_name: newsfairness
    environment:
      DATABASE_URL: mysql://root:Abc123@mysqlsecure:3306/mydb?sslaccept=accept_invalid_certs
      MINUTES_TO_CACHE_RESPONSES: 3
      MINUTES_TO_GO_BACK_AND_DELETE_RECORDS: 2880
    ports:
      - 6747:3000
    networks:
      - web
    expose:
      - 6747
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=web"
      - "traefik.http.routers.newsfairness.entrypoints=websecure"
      - "traefik.http.routers.newsfairness.rule=Host(`news-fairness.peterkellner.net`)"
      - "com.centurylinklabs.watchtower.enable=true"
```

In this file, a network named `web` is defined, and it's declared as external. The `newsfairness` service uses this network, restarts always in case of failure, and exposes the port 6747. This service uses the image built from our Dockerfile and sets up certain environment variables, such as the `DATABASE_URL`. Note that this `DATABASE_URL` is different from the one used at build time.

## GitHub Actions

Now, let's introduce the third component of our application deployment flow - GitHub Actions. GitHub Actions help you automate your software development workflows in the same place you store code and collaborate on pull requests and issues.

```yaml
name: news-fairness

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web

    name: docker build if docker file changed
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Get changed files using defaults
        id: changed-files
        uses: tj-actions/changed-files@v35

      - name: Get changed files using a comma separator
        id: changed-files-comma
        uses: tj-actions/changed-files@v35
        with:
          separator: ","

      - name: Get changed action file
        id: changed-files-specific
        uses: tj-actions/changed-files@v35
        with:
          files: |
            .github/workflows/docker-build-push.yml

      - name: Run step if any of the listed files above change
        if: steps.changed-files-specific.outputs.any_changed == 'true'
        env:
          GH_TOKEN: ${{secrets.GH_TOKEN}}
          GH_USERNAME: ${{secrets.GH_USERNAME}}
          DATABASE_URL_EXTERNAL: ${{secrets.DATABASE_URL_EXTERNAL}}
        run: |
          RELEASEVERSION=0.101
          RELEASEDATE1=$(date +"%m/%d/%YT%H:%M:%S%p")
          RELEASEDATE=$(TZ=":US/Pacific" date +%c)
          RELEASEDATEISO=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
          perl -ni -e 'next if /^RELEASE(?:VERSION|DATE)=/;print' .env.production
          (
          echo "RELEASEVERSION=$RELEASEVERSION"
          echo "RELEASEDATE=$RELEASEDATE"
          echo "RELEASEDATEISO=$RELEASEDATEISO"
          ) >> .env.production
          cat .env.production
          docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
          echo $GH_TOKEN | docker login ghcr.io -u $GH_USERNAME --password-stdin &
          docker build --build-arg DATABASE_URL=$DATABASE_URL_EXTERNAL . --file Dockerfile --tag ghcr.io/pkellner/newsfairness:latest --tag ghcr.io/pkellner/newsfairness:$RELEASEVERSION 
          docker push ghcr.io/pkellner/newsfairness --all-tags
```

This GitHub Actions script, triggered when you push to the main branch, will build a Docker image if the Dockerfile has changed. The `secrets` in the script are sensitive pieces of information that you don't want to expose in your code. They are stored securely in GitHub and can be accessed in GitHub Actions.

For instance, `DOCKER_USER` and `DOCKER_PASSWORD` are your DockerHub username and password, respectively. `GH_TOKEN` is your GitHub token used for authenticating with GitHub Container Registry (GHCR), and `GH_USERNAME` is your GitHub username. The `DATABASE_URL_EXTERNAL` is the database connection string used when building the Docker image.

## Conclusion

By combining Dockerfile, docker-compose, and GitHub Actions, you can create an efficient and secure workflow for deploying and managing
