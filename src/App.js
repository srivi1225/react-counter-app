import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import MultiSelect from "./components/muliSelect";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Counters />
        <MultiSelect />
      </React.Fragment>
    );
  }
}

export default App;
