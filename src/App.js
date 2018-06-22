import React, { Component } from 'react';
import MapSearchPlaces from './components/MapSearchPlaces';
import PlaceList from './components/PlaceList';
// import SearchBox from './components/SearchBox';
import './App.css';
import axios from 'axios';


class App extends Component {
  apiKey = "AIzaSyDz_aQ2_PGAvoALbH9oHtg-YpmxmH1K0lg";

  constructor(props) {
    super(props)
    this.state = {
      placeList: []
    };
  }
  onPlaceSearch(placeList) {
    console.log(placeList);
    this.setState({ placeList });
  }

  onSearch(search) {   //Search for specific place
    // var cord = MapService.currentCordinates;
    // var loc = cord.lat + ',' + cord.lng; //check lat and lng order!
    var radius = 5000;
    var searchObj = {
      // location: loc,
      radius: radius,
      //      type: 'restaurant', //think about type!!!
      keyword: search,
      key: this.apiKey
    };
    axios({
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      method: 'GET',
      data: searchObj,
    }).then(function (resp) {
      console.log(resp);
      var response = JSON.parse(resp);
      console.log(response);
    }), function (error) {
      console.log(error);
    };
  }
  render() {
    console.log(this.state.placeList);
    return (
      <div className="appContainer container"  style={{direction:'rtl',textAlign:'right'}}>
        <div className="row">
        <MapSearchPlaces onPlaceSearch={this.onPlaceSearch.bind(this)} />
        <PlaceList placeList={this.state.placeList} apiKey={this.apiKey}></PlaceList>
        </div>
      </div>
    );
  }
}

export default App;
