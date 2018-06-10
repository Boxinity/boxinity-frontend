import React, {Component} from "react";
import Navbar from "../Navbar"
import Map from "../Map"


class App extends Component {

  render () {
    return (
      <div className="App">
        <Navbar />
        <Map />
      </div>
    );
  }
}

export default App;
