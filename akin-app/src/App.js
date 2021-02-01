import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Text from "./Text";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Final from "./Final";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Text} />
        <Route path="/Result" component={Final} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
