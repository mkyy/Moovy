
## Installation

You did all steps of root README, and now you just need a few steps to start running:

Make sure you're inside the frontend folder, if you're on the project root, navigate to the frontend folder.

```bash
$ cd frontend
```

Install dependencies

```bash
$ npm install
```

## Environment Variables

First, create your `.env` file, using your favorite editor, or via graphical interface.
In my case I'll use nano.

```bash
$ nano .env
```

Add the following environment variables to your .env file.
If you don't have a omdbApi key yet, [create your Key](https://www.omdbapi.com/apikey.aspx).

```
REACT_APP_BASEURL= https://www.omdbapi.com/
REACT_APP_MOOVY_API= <your nestjs server>
REACT_APP_APIKEY= <your omdb api key>
```

<details>
<summary>See an example of .env file</summary>


```
REACT_APP_BASEURL= https://www.omdbapi.com/
REACT_APP_MOOVY_API= http://localhost:8080/
REACT_APP_APIKEY= 1a2b3c4d
```

</details>

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
