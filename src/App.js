import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Nominated from "./components/nominated";
import Home from "./components/home";
import Search from "./components/search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
};
  render() {
    return (
      <React.Fragment>
        <Router>

            {/* Switch is used to prevent multiple components from running at once when using routing */}
            <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                <Route  exact path="/search" component={Search} />
                {/* <Route  exact path="/nominated" component={Nominated} /> */}
                {/* <Route  exact path="/checkin/history" component={History} /> */}
            </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
