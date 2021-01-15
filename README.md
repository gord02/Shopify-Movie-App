# Shopify Movie App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Overview
Frontend application created to facilitate the search and nomination of movies from the OMDb API.

### How The Project Works 
At the index route of this application there will be a search bar where the name of the movie you would like to search for, or nominate can be inputed. The input value must be a correctly spelled word and should be at least some part of the desired movie you wish to find. For instance, if I wanted to search for the movie “Toy Story”, inputting “toy”, “story” and “Toy Story” will all display some results of the “Toy Story” franchise, but the more specific the input value, the better the results. Once finished inputting a value, press “return” on the keyboard or search icon so that the list movies closest to your inputted value will be displayed below.

Link to the hosted project
[Shopify Movie App](https://gord02.github.io/Shopify-Movie-App/)

### Running Locally
Use command `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Technology
- Axios, used for making get requests to OMDb API
- React, used for component rendering 
- SessionStorage, used for storing Nominated movies incase page reloaded 
- Bootstraps, used for styling

### Assumptions
In the extra functionality that the application could have it states that a possible function is to “Save nomination lists if the user leaves the page”. I chose to interpret this as in the event that the page is reload, the data for the nominations would remain. Therefore, I chose to use a sessionStorage object which can save data up until the page is closed. So for my application when a user refreshes the page their nomination data remains.
