import React, { Component } from 'react'
import Search from "./components/search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
 
  render() {
    return (
      <React.Fragment>
        <Router>
            {/* Switch is used to prevent multiple components from running at once when using routing */}
            <Switch>
                <Route  exact path="/" component={Search} />
            </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
