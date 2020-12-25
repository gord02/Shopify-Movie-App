import React, { Component, Link } from 'react';
import axios from 'axios';


class Search extends Component {
    constructor(props) {
        super(props);
        this.searchMovie = this.searchMovie.bind(this);
        this.display = this.display.bind(this);
        this.nominate = this.nominate.bind(this);
        this.nominationList = this.nominationList.bind(this);
        this.removeNomination = this.removeNomination.bind(this);
        // this.Print = this.Print.bind(this);
        this.state = {
            movie: {},
            nominations:[],
            isNominated: {}
        };
    };

    searchMovie(event) {
        event.preventDefault();
        let rawTitle= this.movieTitleInput.value;
        // console.log("title: ",rawTitle);
        let title = rawTitle.replace(' ', '+');
        // console.log("new title: ",title);
        let apiKey= '&apikey=e36df1a5&'
        let urlInsertion= "t="+title + apiKey
        // console.log("url: ", urlInsertion);
        let url= 'http://www.omdbapi.com/?' + urlInsertion
        
        axios.get(url) 
        .then((response) => {
            // console.log(response.data);
            const movieData=  response.data;
            const year= movieData.Year;
            const newTitle= movieData.Title;
            let movie = {title:newTitle, year:year, plot:movieData.Plot, isNominee:false, id:(newTitle+year)};
            if(this.state.nominations.length === 0) {
                this.setState({movie: movie});
            }
            for(let i=0; i< this.state.nominations.length; i++) {
                // console.log(this.state.nominations);
                if( this.state.nominations[i].id === movie.id) {
                    console.log("here");
                    // this.setState();
                    this.setState({movie: this.state.nominations[i]}, function() {
                        console.log ("current movie: ", this.state.movie);
                    });
                }else{
                    console.log("else");
                     this.setState({movie: movie});   
                }
            }
        });
    }

    display() {
        let movie = this.state.movie;
        console.log("movie: ", movie);
        // console.log("movie: ", movie, typeof(movie));
        // console.log("keys: ", Object.keys(movie));
        let keyLength= Object.keys(movie);
        if(keyLength.length !== 0 ) {    
            return(
                <React.Fragment>
                    <div className="container">
                    <h3>{movie.title}</h3>
                    <h5>{movie.year}</h5>
                    <p>{movie.plot}</p>
                    {/* conditional rendering for remove nomination button */}
                    {movie['isNominee']
                        ? <button onClick={() => {this.removeNomination()}}> Remove Nomination</button> 
                        : <button onClick={() => {this.nominate( )}}>Nominate</button> 
                    }
                    </div>
                </React.Fragment>
            );
        }

    }

    nominate() {
        let movie = this.state.movie;
        // object of movie
        console.log("movie: ", movie);
        // this.setState({isNominated: {movie: true}});

        this.setState(prevState => {
            // creating copy of state variable movie
            let movie = Object.assign({}, prevState.movie); 
            // update the name property, assign a new value  
            movie.isNominee = true;    
            // console.log("122 movie: ", movie);
            // return new object movie object to be set to state                         
            return { movie };                              
        }, () =>{
            console.log("nominee is updated");
            this.updateList();
        });
    }
    updateList() {
        let movie = this.state.movie;
        console.log("movie: ", movie);
        this.setState({ nominations: this.state.nominations.concat([movie])});
    }

    removeNomination() {
        console.log("Is run");
        let movie = this.state.movie;
        // let index = this.state.nominations.findIndex(x => x['id'] === movie['id']);
        let i=0;
        for( i; i<this.state.nominations.length; i++) {
            console.log("Is iterated");
            if(this.state.nominations[i]['id'] === movie['id']){
                // return i;
            }
        }
        console.log("Is iterated");
        let index = i;
        console.log("index: ", i);
        // let index = this.state.nominations.findIndex(x => x.title === title);
        // console.log("index value: ", this.state.nominations[index]);
        // this.setState({ 
        //     arrayvar: this.state.arrayvar.concat([newelement])
        //   })
        let newList= this.state.nominations
        let editedList= newList.splice(index, 1);
        this.setState({nominations: editedList});
        console.log("edited list: ", editedList);
        
        // const newList = this.state.nominations.splice(index, 1);
        // console.log("newlist: ", newList);
        // this.setState({nominations: newList});


        this.setState(prevState => {
            // creating copy of state variable movie
            let movie = Object.assign({}, prevState.movie); 
            // update the name property, assign a new value  
            movie.isNominee = false;          
            // return new object movie object to be set to state                         
            return { movie };                              
        });
    }

    nominationList() {
        let thisKeyword= this;
        let array= this.state.nominations;
        console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));
    }

    render() {
        return (
            <React.Fragment>
            <form onSubmit={(event) => { this.searchMovie(event) }}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Movie Title</label>
                        <input type="name" className="form-control" id="title" aria-describedby="MovieTitle" placeholder="Enter movie title" ref={(input) => { this.movieTitleInput = input }} required></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {this.display()}

            <button onClick={()=> {this.nominationList()}} type="button" className="btn btn-primary">View nominations</button>
            {/* {this.Print()} */}
            {/* <Link to='/movie'> <button type="submit" className="btn btn-primary">Submit</button></Link> */}

            </React.Fragment>
        );
    }
}

export default Search;