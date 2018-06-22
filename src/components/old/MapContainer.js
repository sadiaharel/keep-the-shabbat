import React, { Component } from 'react';
// import Map from './Map';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// fetchPlaces(mapProps, map) {
//     const { google } = mapProps;
//     const service = new google.maps.places.PlacesService(map);
//   };
const style = {
    width: '100%',
    height: '100%'
  }
class MapContainer extends Component {
  render() {
    return (
   <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 31,
            lng: 30
          }}
          zoom={15}
          onClick={this.onMapClicked}
        //  onReady={this.fetchPlaces}
          visible={false}>
          <Listing places={this.state.places} />
    ></Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDz_aQ2_PGAvoALbH9oHtg-YpmxmH1K0lg")
})(MapContainer)