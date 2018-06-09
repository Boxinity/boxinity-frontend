import React, {Component} from 'react';
import {Map} from 'google-maps-react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from "react-bootstrap";


export default class MapContainer extends Component {

  constructor (props) {
    super(props);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleMake = this.handleMake.bind(this);
    this.handleChatRoomName = this.handleChatRoomName.bind(this);
    this.setMap = this.setMap.bind(this);
    this.addMarker = this.addMarker.bind(this);

    this.state = {
      makeModalShow : false,
      enterModalShow : false,
      map : '',
      ChatRoomName : '',
      latLng : ''
    }
  }

  //continuous update
  setMap (mapProps, map) {
    this.setState({map : map})

    //add markers in server
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
      ChatRoomName : ''
    });
  }

  handleMake () {
    this.setState({
      makeModalShow : false,
      ChatRoomName : ''
    });

    //add markers to server
    this.addMarker(this.state.ChatRoomName, this.state.latLng)
  }

  addMarker (name, position) {
    var self = this;
    var google = this.props.google;

    var marker = new google.maps.Marker({
      position: this.state.latLng,
      name : this.state.ChatRoomName,
      map : this.state.map
    });

    marker.addListener('click', function() {
      self.setState({
        enterModalShow : true,
        ChatRoomName : marker.name
      })
    });
  }

  handleEnter () {
    //enter chatroom
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: '100%'
    }

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
        </div>
      </div>
    );
  }
}
