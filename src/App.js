import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Component/Header";
import Checkout from "./Component/Checkout";
import Login from "./Component/Login";
import Home from "./Component/Home";


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
            <Route path="/checkout">
              <Header></Header>
              <Checkout></Checkout>
            </Route>
            <Route path="/login">
              <Header></Header>
              <Login></Login>
            </Route>
            <Route path="/">
              <Header></Header>
              <Home></Home>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
