import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchBox extends React.Component {
 
  onPlacesChanged = () => {
    console.log(this.searchBox.getPlaces());
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }
  onBoundChanged = () => {
    console.log(this.searchBox.getPlaces());
  }

  componentDidMount() {

    let input = ReactDOM.findDOMNode(this.refs.input);
    const google = window.google;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('bounds_changed', this.onBoundChanged);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    const google = window.google;
    // https://developers.google.com/maps/documentation/javascript/events#removing
    google.maps.event.clearInstanceListeners(this.searchBox);
  }
  render() {
    return <input ref="input" {...this.props} type="text" />;
  }
}