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
            title:'',
            year:'',
            plot:'',
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
            let title= movieData.Title;
            let year= movieData.Year;
            let plot= movieData.Plot;
            let movie = {title:title, year:year, isNominee:false, id:title+year};
            if(this.state.title !== title) {
                this.setState({title: title});
                this.setState({year: year});
                this.setState({plot: plot});
                this.setState({movie: movie});
            }
        });
    }

    display() {
        let movie= this.state.movie;
        if(this.state.title !== '') {
            // let movie = {title:this.state.title, year:this.state.year};
            // let isNominated= true
            // let movie = {title:title, year:year};
            // let isMovieNominated = async (isNominated, movie) => { 
            //     isNominated= true
            //     movie = {title:title, year:year};
            //     console.log("movie: ", movie);
            // };
            // isMovieNominated(isNominated, movie).then( () => {
            //     for (let i = 0; i < this.state.nominations.length; i++) {
            //         // console.log("yo");
            //         if (this.state.nominations[i] !== movie) {
            //             isNominated= false
            //         }      
            //     }
            //     return isNominated;
            // });
            // if(this.isNominatedCheck(movie) === false){
            //     // console.log("is nominated");
            //     // this.setState({ nominations: [this.state.nominations,  movie] });
            //     // this.setState({ nominations: this.state.nominations.concat([movie])});
            //     // this.setState({isNominated: true});    
            // }
          
            return(
                // <React.Fragment>
                    <div className="container">
                    <h3>{this.state.title}</h3>
                    <h5>{this.state.year}</h5>
                    <p>{this.state.plot}</p>
                    {/* conditional rendering for remove nomination button */}
                    {movie['isNominee']
                        ? <button onClick={() => {this.removeNomination(movie)}}> Remove Nomination</button> 
                        : <button onClick={() => {this.nominate(movie )}}>Nominate</button> 
                    }
         
                    </div>
                // </React.Fragment>
            );
        }

    }

    nominate(movie) {
        // object of movie
        // let movie = {title:title, year:year, isNominee:false};
        console.log("movie: ", movie);
        // this.setState({isNominated: {movie: true}});
        this.setState({movie: {isNominee: true}});
        this.setState({ nominations: this.state.nominations.concat([movie])});

        // if(this.isNominatedCheck(movie) === false){
        //     console.log("is nominated");
        //     // this.setState({ nominations: [this.state.nominations,  movie] });
        //     this.setState({ nominations: this.state.nominations.concat([movie])});
        //     // this.setState({isNominated: true});    
        // }
    }
    // isNominatedCheck(movie) {
    //     let i= 0;
    //     while(i < (this.state.nominations.length + 1)) {
    //         // console.log("yo");
    //         if (this.state.nominations[i] === movie) {
    //             return true;
    //         }
    //         i++;
    //     }
    //     return false;
    // } 
  
    nominationList() {
        let thisKeyword= this;
        let array= this.state.nominations;
        console.log("isNominated: ", this.state.isNominated);
        console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));
        // this.Print(array); 
        
        // console.log("nomination value: ", this.state.isNominated['movie'], "typeOf: ", typeof(this.state.isNominated.value));
        // console.log("nomination object: ", this.state.isNominated, "typeOf: ", typeof(this.state.isNominated));
    }

    removeNomination(movie) {
        // let movie = {title:title, year:year};
        // this.nominationList();
        // this.setState({ nominations: [this.state.nominations,  movie] }); 
        
        let index = this.state.nominations.findIndex(x => x['id'] === movie['id']);
        console.log("index value: ", this.state.nominations[index]);
        const newList = this.state.nominations.splice(index, 1);
        this.setState({nominations: newList});
        this.setState({movie: {isNominee: false}});
        // this.setState({isNominated: {movie:false}});
        // this.nominationList();
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