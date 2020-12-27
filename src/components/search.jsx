import React, { Component, Link } from 'react';
import axios from 'axios';
import '../search.css';



class Search extends Component {
    constructor(props) {
        super(props);
        this.searchMovie = this.searchMovie.bind(this);
        this.display = this.display.bind(this);
        this.condtition = this.condtition.bind(this);
        this.nominate = this.nominate.bind(this);
        this.nominationList = this.nominationList.bind(this);
        this.removeNomination = this.removeNomination.bind(this);
        // this.Print = this.Print.bind(this);
        this.state = {
            inputData:'',
            movies: {},
            nominations:[],
            isNominated: {},
            isNominee: true,
            isSearched: false,

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
        let urlInsertion= "s="+title + apiKey
        // console.log("url: ", urlInsertion);
        let url= 'http://www.omdbapi.com/?' + urlInsertion
        
        axios.get(url) 
        .then((response) => {
            // console.log(response.data);
            const movieData=  response.data;
            console.log("Movie Data: ",movieData);
            const movies= response.data.Search;
            // for(let i=0; i<movies.length; i++) {

            // }
            // ============
            // const year= movieData.Year;
            // const newTitle= movieData.Title;
            // let movie = {title:newTitle, year:year, plot:movieData.Plot, isNominee:false, id:(newTitle+year)};
            // ===========
            for(let i=0; i<movies.length;i++) {
                movies[i].isNominee = false;
                // var person = {fname:"John", lname:"Doe", age:25};
            }
            console.log(movies);
            if(this.state.nominations.length === 0) {
                // this.setState({movie: movie});
                this.setState({movies: movies});
            }
            for(let i=0; i< this.state.nominations.length; i++) {
                // console.log(this.state.nominations);
                if( this.state.nominations[i].id === movies[i].imdbID) {
                    console.log("here");
                    this.setState({isSearched: true});
                    // this.setState();
                    this.setState({movie: this.state.nominations[i]}, function() {
                        console.log ("current movie: ", this.state.movie);
                        this.setState({isSearched: true});
                    });
                }else{
                    console.log("else");
                    // this.setState({movie: movie});   
                    this.setState({movies: movies});   
                }
            }
        });
    }

    condtition(i) {
        alert('You are limited to 5 nominations');
        // let movies= this.state.movies;
        // console.log("condtion");
        // if( this.state.nominations.length === 5) {
        // //    return <button type="button" className="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="You are limited to 5 nominations" style={{ margin: '8px'}}>Nominate</button> 
        //     // return (alert("No more nominations can be made"));
        
        // movies.forEach(flim => {
        //     if(movies[i].isNominee === false){
        //         console.log("met");
        //         return (<button onClick={() =>  {this.nominate(i); }} style={{ margin: '8px'}}>Nominate</button> );
        //     }
        // });
        // for(let num=0; num<movies.length;num++){
        //     if(movies[num].isNominee === false){
        //         console.log("met");
        //         return <button onClick={() =>  {this.nominate(i); }} style={{ margin: '8px'}}>Nominate</button>
        //     }
        // }
       
    }

    display() {
        // let movie = this.state.movie;
        let movies = this.state.movies;
        console.log("movies: ", movies);
        // let keyLength= Object.keys(movie);

        // if(movies.length !== 0 ) {    
            return(
                // <React.Fragment>
                //     <div className="container">
                //     <h5 style={{display: 'inline'}}>{movie.title} </h5>
                //     <h5 style={{display: 'inline'}}> ({movie.year})   </h5>
                //     <p style={{ marginBottom: '2px'}}>{movie.plot}</p>
                //     {/* conditional rendering for remove nomination button */}
                //     {movie['isNominee']
                //         ? <p></p>
                //         : <button onClick={() => { 
                //            if(this.state.nominations.length === 5) {
                //                 alert("No more nominations can be made");
                //            } this.nominate()} 
                //         } style={{ margin: '8px'}}>Nominate</button> 
                //     }
                //     </div>
                // </React.Fragment>
                <React.Fragment>
                    <div className="container">
                    {Object.keys(movies).map((i, key) => (
                        <ul> 
                            <li key={ movies[i].imdbID}> 
                            <h5 style={{display: 'inline'}}> {movies[i].Title} </h5>
                            <h5 style={{display: 'inline'}}> ({movies[i].Year})   </h5>
                            {movies[i].isNominee !== false
                                ? <p></p>
                                : <button onClick={() => {if(this.state.nominations.length === 5){this.condtition()}else{{this.nominate(i)}}  }} style={{ margin: '8px'}}>Nominate</button> 
                            }
                            {/*  */}

{/* {if(this.state.nominations.length !== 5){this.condtition}else{{this.nominate(i)}}  */}
                            {/* {movies[i].isNominee !== false || this.state.nominations.length !== 5
                                ? <p></p>
                                :  <button onClick={() =>  {this.nominate(i); }} style={{ margin: '8px'}}>Nominate</button> 
                            } */}

                             {/* {this.state.nominations.length !== 5
                                ? <p></p>
                                :  <button onClick={() =>  {this.nominate(i); }} style={{ margin: '8px'}}>Nominate</button> 
                            }  */}
                            
                                {/* // <button onClick={() =>  {this.nominate(i)} } style={{ margin: '8px'}}>Nominate</button> 
                                // type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="You are limited to 5 nominations" */}
                            {/* <button  {this.state.nominations.length !== 5 ? this.nominate(i) : data-toggle="popover" title= "Popover title" data-content="You are limited to 5 nominations" }></button>
                            {movies[i].isNominee !== false
                                ? <p></p>
                                : <button onClick={() =>  
                                    {if(this.state.nominations.length !== 5) {
                                        this.nominate(i);
                                    }else{
                                       { console.log("ELSE")}
                                    //  {data-toggle="popover" title= "Popover title" data-content="You are limited to 5 nominations" }
                                    }
                                }
                                         } style={{ margin: '8px'}}>Nominate</button> 
                                // <button onClick={() =>  {this.nominate(i)} } style={{ margin: '8px'}}>Nominate</button> 
                                // type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="You are limited to 5 nominations"
                            } */}


{/* {this.state.nominations.length !== 5 'default' && 'active'}
 */}


                            {/* {this.state.nominations.length === 5
                                ? <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="You are limited to 5 nominations" onClick={() =>  {this.nominate(i)} } style={{ margin: '8px'}}>Nominate</button> 
                                : <button onClick={() =>  {this.nominate(i)} } style={{ margin: '8px'}}>Nominate</button> 
                            } */}
                            {/* <p style={{ marginBottom: '2px'}}> {movies[i].imdbID}  </p> */}
                            </li>
                        </ul>
                    ))}
                    {/* conditional rendering for remove nomination button */}
                    {/* {movie['isNominee']
                        ? <p></p>
                        : <button onClick={() => { 
                           if(this.state.nominations.length === 5) {
                                alert("No more nominations can be made");
                           } this.nominate()} 
                        } style={{ margin: '8px'}}>Nominate</button> 
                    } */}
                    {/* <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="You are limited to 5 nominations">Click to toggle popover</button> */}
                      {movies.isNominee !== false
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
        // }

    }

    nominate(i) {
        console.log("i: ", i);
        // let movie = this.state.movie;
        let movies = this.state.movies;
        // let movies = this.state.movies.Search;
        // object of movie
        console.log("movies: ", movies);
        // this.setState({isNominated: {movie: true}});

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
        console.log("Is run");
        let movies = this.state.movies;
        let nomiees= this.state.nominations.length;
        // let index = this.state.nominations.findIndex(x => x['id'] === movie['id']);
        let num=0;
        // movies[i].imdbID
        console.log("nominations: ", this.state.nominations);
        for( num; num<nomiees; num++) {
            // console.log("Is iterated");
            if(this.state.nominations[num]['imdbID'] === movies[i]['imdbID']) {
                console.log("i: ", i);
                // return i;
                
            }
            
        }
        console.log("Is iterated");
        let index = (i);

        let newList= this.state.nominations;
        console.log("newList: ", newList);
        let editedList= newList.splice(index, 1);
        // console.log("newList: ", newList);
        // console.log("editedList: ", editedList);
        this.setState({nominations: newList});
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
        // console.log("List: ", List, typeof(List));
        return(
            <React.Fragment>
                 {this.state.nominations.length === 5
                        ? 
                        // <div class="jumbotron jumbotron-fluid">
                            <div className="container" style={{backgroundColor: "#E9ECEF"}}> 
                                <h5 className="display-5">You have nominated 5 movies</h5>
                            </div>
                        // </div>
                        : <p></p>
                        }

                 {Object.keys(array).map((i, key) => (
                    <ul> 
                            {/* style="list-style: none;" */}
                            {/* Object.keys(array)[i].toString() */}
                            {/* {console.log("array: ",array)}
                            {console.log("array: ",array[i].imdbID)} */}
                            <li key={array[i].imdbID}>  {array[i].Title} "({array[i].Year})" </li>
                                {/* <td>    </td> */}
                               <button onClick={() => {this.removeNomination(i)}} style={{display: 'inline', marginBottom: '8px'}}> Remove </button>
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
                        {/* {Object.keys(this.state.movies).length ===0
                        ? <h2 id="title">Results</h2>
                        : <h2 id="title">Results for "{this.state.movie.title}"</h2>
                        } */}
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