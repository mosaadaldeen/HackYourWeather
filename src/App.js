import React from "react";
import "./App.css";
import SearchForm from "./Components/searchForm";
import CityDetails from "./Components/CityDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Weather</h1>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={SearchForm} />
          <Route path="/:cityId" component={CityDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
