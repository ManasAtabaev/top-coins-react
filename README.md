# Getting Started

-   Run `npm install`
-   Update `.env.development` file with you API url `REACT_APP_API_URL` and `REACT_APP_API_URL_GET_COINS_DATA` sub url to get coins data (This way was done because `CORS` and also because `coinmarketcap` require header authorization via personal API key which cannot be shared via public repo, so I created my own backend API server which request data from `coinmarketcap`)

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
