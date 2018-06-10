import React, { Component } from "react";
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from "google-maps-react";
// import child component
import MapContainer from "./MapContainer";

class Map extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1> Boxinity </h1>
        <MapContainer user={user} google={this.props.google} />
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: "AIzaSyDv0rqt7RwhVpTgF_nRArs3ExosMl88vws",
})(Map);
