import React from 'react';
import axios from 'axios';

export default class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opening_hours: null,
            openInSaturday: 'אין מידע',
            openNow: 'אין מידע'
        };
    }
    componentWillMount() {
        if (!this.props.place.opening_hours) {
            return;
        }

        if (this.props.place.opening_hours.weekday_text.length === 0) {
            this.getOpeningHours(this.props.place)
        } else {
            this.setOpeningHours(this.props.place.opening_hours);
        }
    }
    getOpeningHours(place) {
        console.log('getOpeningHours');
        let self = this;
        axios({
            url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place.place_id + '&key=' + self.props.apiKey,
            method: 'GET',
        }).then(function (resp) {
            let opening_hours = resp.data.result.opening_hours;
            self.setOpeningHours(opening_hours)
        }), function (error) {
            console.log(error);
        };
    }
    setOpeningHours(opening_hours) {
        console.log(opening_hours);
        let openInSaturdayHours = 'אין מידע';
        let openInSaturday = 'אין מידע';
        let open_now = 'אין מידע';
        if (opening_hours) {
            // maybe need to use opening_hours.periods - check for day: 6
            openInSaturdayHours = opening_hours.weekday_text[5];
            openInSaturday = openInSaturdayHours === 'Saturday: Closed' ? 'סגור בשבת' : 'פתוח בשבת';
            open_now = opening_hours.openNow ? 'פתוח' : 'סגור';
        }
        this.setState({
            opening_hours: opening_hours,
            openInSaturday: openInSaturday,
            openInSaturdayHours: openInSaturdayHours,
            openNow: open_now
        });
    }
    getSaturdayClass() {
        let styleClass;
        switch (this.state.openInSaturday) {
            case 'סגור בשבת':
                styleClass = 'text-success';
                break
            case 'אין מידע':
                styleClass = 'text-warning';
                break
            default:
                styleClass = 'text-danger';
        }
        return styleClass;
    }
    render() {
        let saturdayClass = this.getSaturdayClass();
        if (this.props.place) {
            let place = this.props.place;
            let index = this.props.index;
            return (
                <tr key={index} >
                    <th>{index + 1}</th>
                    <th>{place.name}</th>
                    <th>{place.formatted_address}</th>
                    <th className={saturdayClass} title={this.state.openInSaturdayHours}>{this.state.openInSaturday}</th>
                    <th>{this.state.openNow}</th>
                </tr>)
        } else {
            return ('')
        }

    }

}
