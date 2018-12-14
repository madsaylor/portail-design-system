#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build-demo

# deploy
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:betao-dev/portail-design-system.git master:gh-pages

# cd back
cd -
