rm -rf ./build
npm run build
aws s3 sync build s3://retro-carnage.net