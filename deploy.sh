#!/usr/bin/env sh

# abort on errors
set -e

# lint
npm run lint

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/AfuSensi/truth-mta-wiki-bot-website.git master:deploy

cd -