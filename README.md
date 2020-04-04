# njcovid

Charts and visualizations of New Jersey's COVID19 data, hosted @ https://njcovid.info.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create a live-reloading development build:

```sh
npm run start
```

To create a production build:

```sh
npm run build-prod
```

## Deploying to production

tl: dr; Just push to master.

A Github workflow (.github/workflows/gh-pages.yaml) runs on master commits,
building a production build and committing it to the gh-pages branch for serving via Github Pages.