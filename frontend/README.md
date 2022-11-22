
## Installation

You did all steps of root README, and now you just need a few steps to start running:
Install dependencies

```bash
$ npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BASEURL`= https://www.omdbapi.com/

`REACT_APP_MOOVY_API`= `<your local nestjs server> | http://ec2-18-228-24-92.sa-east-1.compute.amazonaws.com:8080/`

`REACT_APP_APIKEY`= `<your omdb api key>`

And that's it. You're all up to start running the app. Feel free to also visit the [deployed website](http://moovy-client.s3-website-sa-east-1.amazonaws.com/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
