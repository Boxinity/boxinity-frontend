import React, {Component} from "react";
import Navbar from "../Navbar"
import Map from "../Map"
import ChatroomModal from '../ChatroomModal';


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
