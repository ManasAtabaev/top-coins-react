# Getting Started

-   Run `npm install`
-   Update `.env.development` file with you API url `REACT_APP_API_URL` and `REACT_APP_API_URL_GET_COINS_DATA` sub url to get coins data (This way was selected because `CORS` and also because `coinmarketcap` require header authorization via personal API key which cannot be shared via public repo, so I created my own backend API server which request data from `coinmarketcap`)
![Screenshot from 2021-11-13 23-28-59](https://user-images.githubusercontent.com/1281861/141649648-5e250ead-55d2-40b6-b587-07d9e8809e80.png)
![Screenshot from 2021-11-13 23-31-12](https://user-images.githubusercontent.com/1281861/141649651-8c7dd62a-6ba4-4e15-a879-cbb803e092d1.png)


## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
