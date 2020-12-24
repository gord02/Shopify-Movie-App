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
            title:'',
            year:'',
            plot:'',
      nominations:[],
            isNominated: false
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
                    {/* conditional rendering for remove nomination button */}
                    {this.state.isNominated
                        ? <button onClick={() => {this.removeNomination(this.state.title, this.state.year)}}> Remove Nomination</button> 
                        : <button onClick={() => {this.nominate(this.state.title, this.state.year )}}>Nominate</button>
                    }
         
                    </div>
                // </React.Fragment>
            );
        }

    }

    // useEffect() {
    //     // localStorage.setItem("count", count);
    //     localStorage.setItem('isNominated', isNominated);
    //     localStorage.setItem('nominations', nominations);
    // }


    nominate(title, year) {
        console.log("was nominated");
        // object of movie
        let movie = {title:title, year:year};
        console.log("movie: ", movie);
      
        // --------
        // checks if movie is already a nomination, this process uses async function and 
        // let isMovieNominated = async () => { 
        //     if(this.state.isNominated === false){
        //         // this.setState({ nominations: [this.state.nominations,  movie] });
        //         this.setState({ nominations: this.state.nominations.concat([movie])});
        //         console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));
        //     }
        // };
        // isMovieNominated().then( () => {
            
        //     for (let i = 0; i < this.state.nominations.length; i++) {
        //         console.log("yo");
        //         if (this.state.nominations[i] === movie) {
        //             console.log("yo-yo");
        //             this.setState({isNominated: true});
        //         }      
        //     }
        // });
        // ---
      
        if(this.state.isNominated === false){
            // this.setState({ nominations: [this.state.nominations,  movie] });
            this.setState({ nominations: this.state.nominations.concat([movie])});
            this.setState({isNominated: true});
            // console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));
        }
        // this.nominationList();
    }
    nominationList() {
        let thisKeyword= this;
        let array= this.state.nominations;
        console.log("isNominated: ", this.state.isNominated);
        console.log("nomination: ", this.state.nominations, "typeOf: ", typeof(this.state.nominations));
        // this.Print(array); 
    }

    // Print(array) {
    //     return(
    //         array.map(( nominee) => (
    //             <tr>{nominee.title} {nominee.year}</tr>
    //         ))
    //     );
    // }

    removeNomination(title, year) {
        this.nominationList();
        // this.setState({ nominations: [this.state.nominations,  movie] }); 
       let index = this.state.nominations.findIndex(x => x.title === title);
       console.log("index value: ", this.state.nominations[index])
        const newList = this.state.nominations.splice(index, 1);
        this.setState({nominations: newList});
        this.setState({isNominated: false});
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