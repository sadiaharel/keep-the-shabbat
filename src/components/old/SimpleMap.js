import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {


  render() {
    const defaultProps = {
      center: {
        lat: 32,
        lng: 35
      },
      zoom: 15
    };
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDz_aQ2_PGAvoALbH9oHtg-YpmxmH1K0lg" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={31}
            lng={30}
            text={'Map'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;