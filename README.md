This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start:server`

Runs the backend api in the development mode with live reload.<br />
Open [http://localhost:5000/api/gql](http://localhost:5000/api/gql) to view and test the graphql api.
Open [http://localhost:5000/](http://localhost:5000/) to view the frontend app if you have already built the client.

### `npm run start:client`

Launches the frontend UI app in the development mode with live reload for debugging purpose.<br />
Open [http://localhost:3000/](http://localhost:3000/) to view UI.

### `npm test`

Runs the tests.

### `npm run cover`

Runs the tests and produce test coverage report.

### `npm run prettier`

Runs prettier code formatting tool to formate the souce code.

### `npm run build:client`

Builds frontend SPA.
Frontend build result is in `build`, can be viewed by opening up `index.html`.

### `npm run build:server`

Builds backend api service.
Backend build result is in `dist`, can be run by `node index.js`

### `npm run build`

Builds both backend and frontend.
Backend build result is in `dist`, can be run by `node index.js`
Frontend build result is in `build`, can be viewed by opening up `index.html`.

### `npm run serve`

Starts the backend service in `dist`. You need to build the backend first.

Run the following commands to serve both api and web app at http://localhost:5000/ :

    npm run build && npm run serve

`CTRL + C` to terminate.

### Docker container

To build and start the docker container :

    docker run --rm -p 8080:5000 --name events $(docker build -q -t events .)

Visit http://localhost:8080/ on your browser to view the web app, and http://localhost:8080/api/gql to debug the api.

Note, this is going to use `events` as both the docker image name and container name, if you have already had same name image/container, pls rename `events` to something unique.

To stop the container running, open up another terminal :

    docker stop events

### Features

1. Both frontend and backend implemented by Typescript.
2. GraphQL API, supports filtering events list by keyword, date, city, state and country.
3. UI implemented by React and Material UI.
4. Supports IE 11.
5. Integrated Google Map API ( with limitations due to billing ).
6. Run as docker container.

### TODO

1. Improve test coverage.
2. Google Map API Key requires enabling billing.
3. Add integration test using Cypress.
4. Improve UI to allow filtering events list by existing API.
