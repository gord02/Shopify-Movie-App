import React, { Component, Link } from 'react';
import axios from 'axios';


class Search extends Component {
    constructor(props) {
        super(props);
        this.searchMovie = this.searchMovie.bind(this);
        this.display = this.display.bind(this);
        this.state = {
            title:'',
            year:'',
            plot:''
        };
    };

    searchMovie(event) {
        event.preventDefault();
        let rawTitle= this.movieTitleInput.value;
        console.log("title: ",rawTitle);
        let title = rawTitle.replace(' ', '+');
        console.log("new title: ",title);
        let apiKey= '&apikey=e36df1a5&'
        let urlInsertion= "t="+title + apiKey
        console.log("url: ", urlInsertion);
        let url= 'http://www.omdbapi.com/?' + urlInsertion
        
        axios.get(url) 
        .then((response) => {
            console.log(response.data);
            const movie=  response.data;
            let title= movie.Title;
            let year= movie.Year;
            let plot= movie.Plot;
            if(this.state.title !== title) {
                this.setState({title: title});
                this.setState({year: year});
                this.setState({plot: plot});
                this.display();
            }
        });
    }

    display() {
        if(this.state.title !== '') {
            return(
                // <React.Fragment>
                    <div className="container">
                    <h3>{this.state.title}</h3>
                    <h5>{this.state.year}</h5>
                    <p>{this.state.plot}</p>
                    <button onClick={() => {this.nominationList()}}>Nominate</button>
                    </div>
                // </React.Fragment>
            );
        }

    }

    nominationList( ) {

    }

    render() {
        return (
            <React.Fragment>
            <form onSubmit={(event) => { this.searchMovie(event) }}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Movie Title</label>
                        <input type="name" className="form-control" id="title" aria-describedby="MovieTitle" placeholder="Enter movie title" ref={(input) => { this.movieTitleInput = input }} ></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <button onClick={ ()=>{this.display()}} type="submit" className="btn btn-primary">Submit</button>
            </form>
            {this.display()}
            {/* <Link to='/movie'> <button type="submit" className="btn btn-primary">Submit</button></Link> */}

            </React.Fragment>
        );
    }
}

export default Search;