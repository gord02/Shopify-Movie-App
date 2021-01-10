import React, { Component } from 'react';
import axios from 'axios';
import '../search.css';

// 1. docstring for all non required / non react included method: https://stackoverflow.com/questions/34205666/utilizing-docstrings
// 2. delete the console logs
// 3. const -> let -> never var
// 4. delete unncessary stuff
// 5. go over the names, think (WWANTV) what would akil name this variable / would he think this is a good enough name
// 6. markdown file

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchMovie = this.searchMovie.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.condition = this.condition.bind(this);
        this.nominate = this.nominate.bind(this);
        this.displayNominationList = this.displayNominationList.bind(this);
        this.removeNomination = this.removeNomination.bind(this);
        this.state = {
            inputData: '',
            movies: [],
            nominations:[],
            isNominee: true,
            isSearched: false,
            animationCondition: ''
        };
    };

    componentDidMount() {
        /**
            * This function is used to retrieve nomination data that potentially existed if the user may have made their selection then reloaded the page.
        */
        // Allows me to retrieve the nominated movies that were stored in sessionStorage
        const nominations = JSON.parse(sessionStorage.getItem("nominations"));
        // Makes sure a null value isn't pushed to state
        if(nominations !== null){
            this.setState({nominations: nominations});
        }
    }

    searchMovie(event) {
        /**
            * This function is used to get movies from the OMDB movie site based on the search value inputted by user, the result of this search is then saved to state
        */
        event.preventDefault();
        const rawTitle = this.movieTitleInput.value;
        this.setState({InputData: rawTitle});
        const title = rawTitle.replace(' ', '+');
        const apiKey = '&apikey=e36df1a5&';
        const urlInsertion = "s=" + title + apiKey;
        const url = 'http://www.omdbapi.com/?' + urlInsertion;
        
        // Creates a post request to the OMDB api requesting movies based on search value from the form in frontend
        axios.get(url) 
        .then((response) => {
            const movies = response.data.Search;
            // adds property for each movie so that each movie can have a property denoting whether it is nominated or not.
            for(let i=0; i< movies.length; i++) {
                movies[i].isNominee = false;
            }

            // this nested for loop checks if the new search results for any of the movies is already in nominations, and if so prevents to nominate button from rendering allowing with it
            for(let i=0; i< movies.length; i++) {
                for(let j=0; j< this.state.nominations.length; j++) {
                    if(this.state.nominations[j]['imdbID'] === movies[i]['imdbID']) {
                        this.setState({isSearched: true});
                        movies[i] = this.state.nominations[i];  
                        break;
                    }
                }
            }
            this.setState({movies: movies});   
        });
    }

    condition() {
        /**
            * This function is used to notify the user that they are not allowed to make more than 5 nominations if the user tried to press nominate for a sixth movie
        */
        alert('You are limited to 5 nominations');
    }

    displaySearchResults() {
        /**
            * This function displays the results from the OMDB api. The name, title and year of release of each movie is displayed along with a button to nominate each one
        */
        const movies = this.state.movies;
        return(
            <React.Fragment>
                <div className="container">
                    {Object.keys(movies).map((i, index) => (
                        <ul key={movies[i].imdbID}> 
                            <li key={movies[i].imdbID} id={movies[i].imdbID}> 
                                <h5 style={{display: 'inline'}}> {movies[i].Title} </h5>
                                <h5 style={{display: 'inline'}}> ({movies[i].Year}) </h5>
                                {movies[i].isNominee !== false
                                    ?   <p></p>
                                    :   <button onClick={() => {
                                            if(this.state.nominations.length === 5) {
                                                this.condition();
                                            }else{
                                                this.nominate(i);
                                            }  
                                        }} style={{ margin: '8px'}} >Nominate</button> 
                                }
                            </li>
                        </ul>
                    ))}
                </div>
            </React.Fragment>
        );
    }

    nominate(i) {
        /**
            * This function is used to facilitates the nomination of a individual movie. This nomination is achieved by changing the property on the movie object and setting the 'isNominee' value to be true therefore distinguishing this movie as a nomination
        */
        this.setState(prevState => {
            // creating copy of state variable movie
            let movies = Object.assign({}, prevState.movies); 
            // update the name property, assign a new value  
            movies[i].isNominee = true;    
            // return new object movies object to be set to state                         
            return { movies };                              
        }, () => {
            this.updateList(i);
        });
    }

    updateList(i) {
        /**
            * This function is used add the selected movie to nominate to a list of nominated movies
        */
        const movies = this.state.movies;
        this.setState({ nominations: this.state.nominations.concat([movies[i]])});
    }

    removeNomination(i) {
        /**
            * This function is used to remove a nominated movie from the list of nominated movies, as well as revert the property of 'isNominee' to false
        */
        const index = i;
        const updatedNominationsList= this.state.nominations;

        // splice used to remove the one value in array starting from index value index
        updatedNominationsList.splice(index, 1);
        this.setState({nominations: updatedNominationsList});
        this.setState(prevState => {

            // creating copy of state variable movie
            let movie = Object.assign({}, prevState.movie); 

            // update the name property, assign a new value  
            movie.isNominee = false;          

            // return new object movie object to be set to state                         
            return { movie };                              
        });
        return true;
    }
    
    displayNominationList() {
        /**
            * This function is used display the list of nominated movies  
        */
        const nominations= this.state.nominations;
        const length= nominations.length;

        return(
            <React.Fragment>
                {length=== 5
                    ? 
                        <div className="container" style={{backgroundColor: "#E9ECEF"}}> 
                            <h5 className="display-5">You have nominated 5 movies</h5>
                        </div>
                    :   <p></p>
                }
                {Object.keys(nominations).map((i, key) => (
                    <ul key={nominations[i].imdbID}> 

                        {/* The index value of nominated movie is passed to remove nomination function */}
                        <li key={nominations[i].imdbID}  id={nominations[i].imdbID}>  {nominations[i].Title} ({nominations[i].Year}) </li>
                        <button onClick={() => {this.removeNomination(i);}} style={{display: 'inline', marginBottom: '8px'}}> Remove </button>
                    </ul>
                ))}
            </React.Fragment>
        );
    }

    componentDidUpdate() {
        /**
            * This function is used to update the sessionStorage so that each time the nomination list is updated, so is sessionStorage allowing the data to be saved even if page is reloaded
        */
        // Allows me to set a value in sessionStorage so that upon refresh of page the nominated values will remain since they are stored in session storage and can be retrieved
        sessionStorage.setItem("nominations", JSON.stringify(this.state.nominations));
    }

    render() {
        /**
            * This function renders component data
        */
        return (
            <React.Fragment>
                <div className='container'>
                    <h1 id="container">The Shoppies</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col"  id="grid">
                            <form onSubmit={(event) => { this.searchMovie(event)}}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" id="title" style={{marginBottom:"1px",display:"block"}}>Movie Title</label>
                                    <input style={{ margin:'0px', display:"inline", width: "96%"}} type="name" className="form-control" id="title" aria-describedby="MovieTitle" placeholder= "Enter movie title"  ref={(input) => { this.movieTitleInput = input }} required></input>
                                    <button type="submit" className="btn btn-primary" style={{display:"inline"}} > <i style={{display:"inline"}} className="fas fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col" id="grid">
                        {Object.keys(this.state.movies).length === 0
                            ? <h2 style={{margin:"4px"}}>Results</h2>
                            : <h2 style={{margin:"4px"}}>Results for "{this.state.InputData}"</h2> 
                        }
                        {this.displaySearchResults()}
                        </div>
                        <div className="col" id="grid">
                            <h2 id="title" style={{marginBottom: "0px"}}>Nominations</h2>
                            <small style={{marginTop: "0px"}}>Only 5 nominations can be made</small>
                            {this.displayNominationList()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;