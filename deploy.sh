#!/bin/bash

# build and deploy the game
rm -rf ./build
npm run build
aws s3 sync ./build s3://retro-carnage.net --delete

# build and deploy the documentation
rm -rf ./site
mkdocs build
aws s3 sync ./site s3://docs.retro-carnage.net --delete

# clean up
rm -rf ./build
rm -rf ./site