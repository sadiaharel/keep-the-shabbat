import React from 'react';

const google = window.google;

export default class MapSearchPlaces extends React.Component {
    searchBox;
    map;
    infoWindow;
    markers = [];
    // constructor(props) {
    //     super(props)

    //     // this.myMapRef= React.createRef();
    // }
    componentWillMount() {
        var self = this;
        setTimeout(function () {
            self.initAutocomplete();
        }, 500);
    }
    initAutocomplete() {
        var self = this;
        let isrealCord = { lat: 31.0461, lng: 34.8516 };
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: isrealCord,
            zoom: 15,
            mapTypeId: 'roadmap'
        });
        this.initMapPosition();
        // Create the search box and link it to the UI element.
        let searchInput = document.getElementById('pac-input');
        this.searchBox = new google.maps.places.SearchBox(searchInput);
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchInput);

        // Bias the SearchBox results towards current map's viewport.
        this.map.addListener('bounds_changed', function () {
            self.searchBox.setBounds(self.map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        this.searchBox.addListener('places_changed', function () {
            let placeList = self.searchBox.getPlaces();
            self.props.onPlaceSearch(placeList);
            console.log(placeList);
            if (placeList.length === 0) {
                return;
            }

            // Clear out the old markers.
            self.markers.forEach(function (marker) {
                marker.setMap(null);
            });
            self.markers = [];

            // For each place, get the icon, name and location.
            let bounds = new google.maps.LatLngBounds();
            placeList.forEach(function (place, index) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                let icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                let labelColor = 'blue';
                if (place.opening_hours&&place.opening_hours.weekday_text.length>0) {
                    console.log(place.opening_hours.weekday_text[5]);
                    let openInSaturdayHours = place.opening_hours.weekday_text[5];
                    labelColor = openInSaturdayHours === 'Saturday: Closed' ? 'green' : 'red';
                }

                // Create a marker for each place.
                self.markers.push(new google.maps.Marker({
                    map: self.map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location,
                    label: {
                        text:  ''+(index + 1),
                        color: labelColor,
                        fontSize: "15px",
                        fontWeight: "bold"
                    },
                    // label: '<' + (index + 1) + '>'  //marker label text
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            self.map.fitBounds(bounds);
        });
    }
    initMapPosition() {
        let self = this;
        this.infoWindow = new google.maps.InfoWindow();

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                self.infoWindow.setPosition(pos);
                self.infoWindow.setContent('Location found.');
                self.infoWindow.open(self.map);
                self.map.setCenter(pos);
            }, function () {
                self.handleLocationError(true, self.infoWindow, self.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, this.infoWindow, self.map.getCenter());
        }
    }
    handleLocationErrofunction(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(this.map);
    }

    render() {

        return (
            <div className="col-md-6">
                <h1 className='text-success'>חיפוש עסק:</h1>
                <input id="pac-input" type="text" className="form-control" placeholder="חיפוש עסק" title='הקלד שם עסק'/>
                <div id="map" style={{ 'width': '100%', 'height': '90vh' }}></div>
            </div>
        )
    }
}
