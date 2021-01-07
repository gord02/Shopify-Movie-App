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
        this.display = this.display.bind(this);
        this.condition = this.condition.bind(this);
        this.nominate = this.nominate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nominationList = this.nominationList.bind(this);
        this.removeNomination = this.removeNomination.bind(this);
        this.state = {
            inputData:'',
            movies: {},
            nominations:[],
            isNominee: true,
            isSearched: false,
            animationCondition: ''
        };
    };

    componentDidMount() {
        console.log("mounted");
        // Allows me to retrieve the nominated movies that were stored in sessionStorage
        let nominations = JSON.parse(sessionStorage.getItem("nominations"));
        // console.log("nominations: ", nominations);
        // Makes sure a null value isn't pushed to state
        if(nominations !== null){
            this.setState({nominations: nominations});
        }
    }

    searchMovie(event) {
        event.preventDefault();
        let rawTitle= this.movieTitleInput.value;
        this.setState({InputData: rawTitle});
        // console.log("title: ",rawTitle);
        let title = rawTitle.replace(' ', '+');
        // console.log("new title: ",title);
        let apiKey= '&apikey=e36df1a5&'
        let urlInsertion= "s="+title + apiKey
        // console.log("url: ", urlInsertion);
        let url= 'http://www.omdbapi.com/?' + urlInsertion
        
        axios.get(url) 
        .then((response) => {
            // console.log(response.data);
            const movies= response.data.Search;

            for(let i=0; i<movies.length;i++) {
                movies[i].isNominee = false;
            }
            // console.log(movies); 
            if(this.state.nominations.length === 0) {
                this.setState({movies: movies});
            }
            for(let i=0; i< this.state.nominations.length; i++) {
                // console.log(this.state.nominations);
                if( this.state.nominations[i]['imdbID'] === movies[i]['imdbID']) {
                    console.log("here");
                    this.setState({isSearched: true});
                    // this.setState({movies: movies});  
                    // movies.pop(i, None);
                    delete movies[i];
                    console.log("AFTER deletion:", movies,"i", i)
                    // this.setState(prevState => {
                    //     // creating copy of state variable movie
                    //     let movies = Object.assign({}, prevState.movies); 
                    //     // update the name property, assign a new value  
                    //     movies[i] = this.state.nominations[i];    
                    //     // return new object movies object to be set to state                         
                    //     return { movies };     
                    //     // console.log()                         
                    // }); 
                    // this.handleChange(i);
                    // this.setState({movie: this.state.nominations[i]}, function() {
                    //     console.log ("current movie: ", this.state.movie);
                    //     this.setState({isSearched: true});
                    // });
                }
            }
            console.log(movies);
            // console.log(this.state.movies);
            this.setState({movies: movies});   
        });
    }
    handleChange(i){
        this.setState(prevState => {
            // creating copy of state variable movie
            let movies = Object.assign({}, prevState.movies); 
            // update the name property, assign a new value  
            movies[i]['isNominee'] = true;    
            // return new object movies object to be set to state                         
            return { movies };                              
        });
    }
    condition() {
        alert('You are limited to 5 nominations');
    }

    display() {
        console.log("nominations: ", this.state.nominations);
        console.log("movies: ", this.state.movies);
        // let movie = this.state.movie;
        let movies = this.state.movies;
        // console.log("movies: ", movies);  
        // console.log("keys: ", Object.keys(movies));
            return(
                <React.Fragment>
                    <div className="container">
                        {Object.keys(movies).map((i, index) => (
                            <ul key={movies[i].imdbID}> 
                                {/* movies[i].imdbID */}
                                <li key={movies[i].imdbID} id={movies[i].imdbID}> 
                                    <h5 style={{display: 'inline'}}> {movies[i].Title} </h5>
                                    <h5 style={{display: 'inline'}}> ({movies[i].Year})   </h5>
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
        this.setState(prevState => {
            // creating copy of state variable movie
            let movies = Object.assign({}, prevState.movies); 
            // update the name property, assign a new value  
            movies[i].isNominee = true;    
            // console.log("122 movies: ", movies);
            // return new object movies object to be set to state                         
            return { movies };                              
        }, () =>{
            console.log("nominee is updated");
            this.updateList(i);
        });
    }

    updateList(i) {
        // let movies = this.state.movies.Search;
        let movies = this.state.movies;
        // console.log("movie: ", movie);
        this.setState({ nominations: this.state.nominations.concat([movies[i]])});
    }

    removeNomination(i) {
        this.setState({animationCondition: "fade out"});
        // Animated.timing(opacity, {
        //     toValue:0,
        //     duration:1000,
        //     useNativeDriver: true
        // }).start()
        console.log("Is run");
        console.log("movie: ", i);
        let index = i;
        let newList= this.state.nominations;
        console.log("newList: ", newList);
        // splice used to remove the one value in array starting from index value index
        newList.splice(index, 1);
        this.setState({nominations: newList});
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
    
    nominationList() {
        let array= this.state.nominations;
        // console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));

        let List= []; // WRONG CHANGE THIS

        let len= array.length;
        // console.log("len: ", len);
        for(let i=0; i<len;i++) {
            List.push(array[i]);
        }
        // console.log("List: ", List, typeof(List));

        return(
            <React.Fragment>
                {/* conditional rendering */}
                {this.state.nominations.length === 5
                    ? 
                        <div className="container" style={{backgroundColor: "#E9ECEF"}}> 
                            <h5 className="display-5">You have nominated 5 movies</h5>
                        </div>
                    :   <p></p>
                }
                {Object.keys(array).map((i, key) => (
                    <ul key={array[i].imdbID}> 
                        {/* The index value of nominated movie is passed to remove nomination function */}
                        <li key={array[i].imdbID}  id={array[i].imdbID}>  {array[i].Title} ({array[i].Year}) </li>
                        <button className= " " onClick={() => {this.removeNomination(i);}} style={{display: 'inline', marginBottom: '8px'}}> Remove </button>
                    </ul>
                ))}
            </React.Fragment>
        );
    }

    componentDidUpdate() {
        // Allows me to set a value in sessionStorage so that upon refresh of page the nominated values will remain since they are stored in session storage and can be retrieved
        sessionStorage.setItem("nominations", JSON.stringify(this.state.nominations));
    }
    render() {
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
                        {/* conditional rendering */}
                        {Object.keys(this.state.movies).length === 0
                            ? <h2 style={{margin:"4px"}}>Results</h2>
                            : <h2 style={{margin:"4px"}}>Results for "{this.state.InputData}"</h2> 
                        }
                        {this.display()}
                        </div>
                        <div className="col" id="grid">
                            <h2 id="title" style={{marginBottom: "0px"}}>Nominations</h2>
                            <small style={{marginTop: "0px"}}>Only 5 nominations can be made</small>
                            {this.nominationList()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;