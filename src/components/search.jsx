import React, { Component, Link } from 'react';
import axios from 'axios';
import '../search.css';



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
            inputData:'',
            movie: {},
            nominations:[],
            isNominated: {},
            isSearched: false
        };
    };

    searchMovie(event) {
        event.preventDefault();
        let rawTitle= this.movieTitleInput.value;
        this.setState({InputData: rawTitle});
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
            // const undefined= movie.id; 
            if(this.state.nominations.length === 0) {
                this.setState({movie: movie});
            }
            for(let i=0; i< this.state.nominations.length; i++) {
                // console.log(this.state.nominations);
                if( this.state.nominations[i].id === movie.id) {
                    console.log("here");
                    this.setState({isSearched: true});
                    // this.setState();
                    this.setState({movie: this.state.nominations[i]}, function() {
                        console.log ("current movie: ", this.state.movie);
                        this.setState({isSearched: true});
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
        // let keys =Object.keys(movie);
        // console.log(Object.keys(movie));
        // console.log("keys: ", keys);
        
        // ;

        
        // console.log("movie.id: ", movie.id, typeof(movie.id));
        // console.log("movie: ", movie, typeof(movie));
        // console.log("keys: ", Object.keys(movie));
        let keyLength= Object.keys(movie);
        if(keyLength.length !== 0 ) {    
            return(
                <React.Fragment>
                    <div className="container">
                    <h5 style={{display: 'inline'}}>{movie.title} </h5>
                    <h5 style={{display: 'inline'}}> ({movie.year})   </h5>
                    <p style={{ marginBottom: '2px'}}>{movie.plot}</p>
                    {/* conditional rendering for remove nomination button */}
                    {movie['isNominee']
                        ? <p></p>
                        : <button onClick={() => { 
                           if(this.state.nominations.length === 5) {
                                alert("No more nominations can be made");
                           } this.nominate()} 
                        } style={{ margin: '8px'}}>Nominate</button> 
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
        let index = (i-1);
        // console.log("index: ", i);
        // let index = this.state.nominations.findIndex(x => x.title === title);
        // console.log("index value: ", this.state.nominations[index]);
        // this.setState({ 
        //     arrayvar: this.state.arrayvar.concat([newelement])
        //   })
        let newList= this.state.nominations;
        console.log("newList: ", newList);
        let editedList= newList.splice(index, 1);
        console.log("newList: ", newList);
        console.log("editedList: ", editedList);
        this.setState({nominations: editedList});
        // console.log("edited list: ", editedList);
        
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
        // console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));
        let List= [];
        let len= array.length;
        // console.log("len: ", len);
        for(let i=0; i<len;i++) {
            List.push(array[i]);
        }
        console.log("List: ", List, typeof(List));
        return(
            <React.Fragment>
                 {this.state.nominations.length === 5
                        ? 
                        // <div class="jumbotron jumbotron-fluid">
                            <div class="container" style={{backgroundColor: "#E9ECEF"}}> 
                                <h5 class="display-5">You have nominated 5 movies</h5>
                            </div>
                        // </div>
                        : <p></p>
                        }

                {Object.keys(array).map((i, key) => (
                    <ul> 
                            {/* style="list-style: none;" */}
                            {/* Object.keys(array)[i].toString() */}
                            <li key={key}>  {array[i].title} "({array[i].year})" </li>
                                {/* <td>    </td> */}
                               <button onClick={() => {this.removeNomination()}} style={{display: 'inline', marginBottom: '8px'}}> Remove Nomination</button>
                        {/* {object[i].title} "{object[i].year}" <button>Remove</button> */}
                    </ul>
                ))}
            </React.Fragment>
            // <h1>Hello</h1>
        );
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
                            <form onSubmit={(event) => { this.searchMovie(event) }}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" id="title" style={{marginBottom:"1px"}}>Movie Title</label>
                                    <input style={{ margin:'0px'}} type="name" className="form-control" id="title" aria-describedby="MovieTitle" placeholder= "Enter movie title" ref={(input) => { this.movieTitleInput = input }} required></input>
                                    <button type="submit" className="btn btn-primary" style={{display:"inline"}} > <i style={{display:"inline"}} className="fas fa-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col" id="grid">
                        {Object.keys(this.state.movie).length ===0
                        ? <h2 id="title">Results</h2>
                        : <h2 id="title">Results for "{this.state.movie.title}"</h2>
                        }
                            {this.display()}
                        </div>
                        <div className="col" id="grid">
                            <h2 id="title" style={{marginBottom: "0px"}}>Nominations</h2>
                            <small style={{marginTop: "0px"}}>Only 5 nominations can be made</small>
                            {/* <button onClick={()=> {this.nominationList()}} type="button" className="btn btn-primary">View nominations</button> */}
                            {this.nominationList()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;