#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

cd dist

git init
git add -A
git commit -m 'AUTO - Deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:brombaut/nhl-api-frontend.git master:gh-pages

cd -