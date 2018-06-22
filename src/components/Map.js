import React from 'react';

export default class Map extends React.Component {
  map;
  infoWindow;
  key = "AIzaSyDz_aQ2_PGAvoALbH9oHtg-YpmxmH1K0lg";

  initMap = function () {
    let self = this;
    const google = window.google;
    const navigator = window.navigator;

    let isrealCord = {lat: 31.0461, lng: 34.8516};
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: isrealCord
    });
    this.infoWindow = new google.maps.InfoWindow();
    console.log(navigator.geolocation, this.infoWindow);
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        self.infoWindow.setPosition(pos);
        self.infoWindow.setContent('Location found.');
        self.infoWindow.open(self.map);
        self.map.setCenter(pos);
        console.log(self.map);
      }, function () {
        self.handleLocationError(true, self.infoWindow, self.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      self.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  }
  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    this.infoWindow.open(this.map);
  }

  render() {

    return (
      <div>
        <button onClick={this.initMap.bind(this)}>Init map</button>
        <div id="map" style={{ 'width': '100%', 'height': '95vh' }}></div>
      </div>
    )
  }
}