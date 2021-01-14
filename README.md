# Shopify Movie App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Link to the hosted project
[Shopify Movie App](https://gord02.github.io/Shopify-Movie-App/)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Overview
Frontend application created to facilitate the search and nomination of movies from the OMDb API.

### Technology
- Axios, used for making get requests to OMDb API
- React, used for component rendering 
- SessionStorage, used for storing Nominated movies incase page reloaded 
- Bootstraps, used for styling

### Assumptions
In the extra functionality that the application could have it states that a possible function is to “Save nomination lists if the user leaves the page”. I chose to interpret this as in the event that the page is reload, the data for the nominations would remain. Therefore, I chose to use a sessionStorage object which can save data up until the page is closed. So for my application when a user refreshes the page their nomination data remains.
