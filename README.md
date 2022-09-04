# muzzy

## prolog

muzzy (combination of "meme" and "buzzy") - your favorite meme sharing web app.

## live demo

This repo is auto-synced with k8s cluster hosted at and abstracted by [Render](https://render.com/)
(see [render.yaml](./render.yaml) for complete production/preview
infrastructure configuration) available at:

https://muzzy.sergeylukin.com/

## quick start

Start up redis

```
docker-compose up
```

Web app + API

```
npm start
```

## run tests

React components unit tests:

```
npm test
```

Cypress powered UI interactivity (mainly dropzone) testing:

```
npm run e2e
```
