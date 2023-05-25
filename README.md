# GrowLoc

The front-end JS App, which uses React, Redux, Sagas. The code is in the src directory.

## Running the App

*Note:* This app has only been tested using the latest version of Chrome.

### Pre-reqs
1. Install [NPM](https://docs.npmjs.com/cli/v6/commands/npm-install). On OSX you can run `brew install npm`
2. Install dependencies for client code: npm install
3. Run : npm start for dev mode and npm run  start:prod for prod mode

## Deploying the App

1. Run : npm run  start:prod
2. Login to the growloc AWS account
3. Go to S3 Bucket and open app.growloc.farm bucket
4. Delete all the content of the bucket
5. Drag and drop the all of the content of dist folder to the bucket 
6. Test the build and changes by navigation to the https://app.growloc.farm/

