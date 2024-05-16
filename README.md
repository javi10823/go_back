Go Back API
This project is a backend API developed in Node.js using TypeScript and Express. The API allows generating images with embedded text, fetching random images from Unsplash and using Jimp to edit the images. The API's security is managed via a secret key passed through an HTTP header.


Prerequisites
To run this project, you will need:

Node.js installed on your machine.
Yarn as a package manager (you can use npm if you prefer, adjusting the commands accordingly).


Project Setup

Install dependencies: yarn install

Set up environment variables:
Create a .env file at the root of the project and add the following environment variables:
PORT=3000
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
SECRET_KEY=your_secret_key


Available Commands
yarn start: Runs the app in production mode.
yarn dev: Runs the app in development mode using nodemon.
yarn build: Compiles the project to JavaScript using TypeScript.
yarn serve: Serves the compiled application.


Running the Application
To start the application in development mode, use the following command: yarn dev


API Call Example
To use the API, you will need to make a GET request including the text you want to add to the image and the secret key in the header. Here is an example using curl:
curl -X GET "http://localhost:3000/text-to-image?text=Hello%20World" \
     -H "x-secret-key: your_secret_key"

