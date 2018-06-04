import React from "react";
import {Button} from "react-bootstrap";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.apicall = this.apicall.bind(this);
    this.state = {response : "notset"}
  }

  apicall() {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3001')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        self.setState({response : xhr.responseText});
      }
    }

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send()
  }

  render() {
    return (
      <div className="App">
        <Button onClick={this.apicall}>Click to Call Api</Button>
        <h1>{this.state.response}</h1>
      </div>
    );
  }
}

export default App;
