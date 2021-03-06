import React, {Component} from "react";
import {Map} from "google-maps-react";
import {Modal, Button, FormGroup, ControlLabel, FormControl} from "react-bootstrap";

import Message from "../Message";

import "./index.css";

const sampleMessages = [
  {username: "SS", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "TestUserName", message: "ESE"},
  {username: "SS", message: "ESE"},
  {username: "TestUserName", message: "ESE"},
];

export default class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleMake = this.handleMake.bind(this);
    this.handleChatRoomName = this.handleChatRoomName.bind(this);
    this.setMap = this.setMap.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.getBoxes = this.getBoxes.bind(this);
    this.onChangeNewMessage = this.onChangeNewMessage.bind(this);
    this.onClickNewMessage = this.onClickNewMessage.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    this.state = {
      makeModalShow : false,
      enterModalShow : false,
      chatroomModalShow : false,
      map : "",
      ChatRoomName : "",
      latLng : "",

      // chat room info
      chatroomMessages: [], // 이전 메시지들. [{username: String, message: String}]
      newMessage: "" // 새로 작성한 메시지
    };
  }

  //continuous update
  setMap (mapProps, map) {
    this.setState({map : map});
    this.continuousBoxUpdate();
  }

  continuousBoxUpdate () {
    setInterval(() => this.getBoxes(), 1000);
  }

  getBoxes() {
    var google = this.props.google;
    var self = this;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/box/?format=json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var boxes = JSON.parse(xhr.responseText);

        boxes.forEach((box) => {
          var latLng = new google.maps.LatLng(box.latitude,box.longtitude);
          self.addMarker(box.name, latLng);
        });
      }
    };

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
  }


  onMapClicked (mapProps, map, clickEvent) {
    this.setState({
      makeModalShow : true,
      latLng : clickEvent.latLng
    });
  }

  handleChatRoomName (e) {
    this.setState({ChatRoomName : e.target.value});
  }

  handleHide() {
    this.setState({
      makeModalShow : false,
      enterModalShow : false,
      chatroomModalShow: false,
      ChatRoomName : "",
      chatroomMessages: [],
      newMessage: "",
    });
  }

  handleMake () {

    this.setState({
      makeModalShow : false,
      ChatRoomName : ""
    });

    //add markers to server
    this.addBox(this.state.ChatRoomName, this.state.latLng.lat(), this.state.latLng.lng());
  }

  addBox (name, lat, lng) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/api/box/");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.getBoxes();
      }
    };

    xhr.setRequestHeader("Content-Type", "application/json");
    var boxInfo = {
      name : name,
      detail : "detail",
      latitude : lat,
      longtitude : lng,
      chatting_url : "chatting_url",
      user : ["1"]
    };

    xhr.send(JSON.stringify(boxInfo));
  }

  addMarker (name, position) {
    var self = this;
    var google = this.props.google;

    var marker = new google.maps.Marker({
      position: position,
      name : name,
      map : this.state.map
    });

    marker.addListener("click", function() {

      self.setState({
        enterModalShow : true,
        ChatRoomName : marker.name
      });
    });
  }

  handleEnter () {
    //enter chatroom
    this.setState({
      chatroomModalShow: true,
      chatroomMessages: sampleMessages, // TODO: use empty array if server implemented
      // chatroomMessages: [],
      newMessage: ""
    });

    // TODO: get chat room messages from server
  }

  // chat room handers
  onChangeNewMessage(e) {
    this.setState({newMessage: e.target.value});
  }

  onClickNewMessage() {
    const username = this.props.user ? this.props.user.username : "TestUserName";


    // TODO: post to server

    this.setState({
      chatroomMessages: [...this.state.chatroomMessages, { // append new message
        username: username,
        message: this.state.newMessage,
      }],
      newMessage: "",
    });
  }

  render() {
    const mapStyle = {
      width: "100%",
      height: "100%"
    };

    const { chatroomMessages, newMessage } = this.state;
    const { user } = this.props;

    return (
      <div>
        <Map
          google={this.props.google}
          style={mapStyle}
          initialCenter={{
            lat: 37.5626,
            lng: 126.9366
          }}
          zoom={15}
          onReady={this.setMap}
          onClick={this.onMapClicked}>
        </Map>

        <div className="modal-container" style={{ height: 200 }}>
          <Modal
            show={this.state.makeModalShow}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Make ChatRoom
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Input Your New ChatRoom Name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter ChatRoom Name"
                    value={this.state.ChatRoomName}
                    onChange={this.handleChatRoomName}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleMake}>Make</Button>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.enterModalShow}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Do You Want To Enter This ChatRoom?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2>{this.state.ChatRoomName}</h2>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleEnter}>Yes</Button>
              <Button onClick={this.handleHide}>No</Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.chatroomModalShow}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                <h2>ChatRoom: {this.state.ChatRoomName}</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ol className="chatroom-messages">
                {
                  chatroomMessages.map(({username, message}, i) =>
                    <Message key={i} user={user} username={username} message={message} />
                  )
                }
              </ol>
            </Modal.Body>
            <Modal.Footer>
              <div style={{display: "inline"}}>
                <FormControl
                  type="text"
                  value={newMessage}
                  placeholder="Enter text"
                  onChange={this.onChangeNewMessage}
                />

                <Button bsStyle="info" onClick={this.onClickNewMessage}>Post</Button>
              </div>

            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
