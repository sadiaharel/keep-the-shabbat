import React from 'react';

import Place from './Place';

import 'bootstrap/dist/css/bootstrap.min.css';


export default class PlaceList extends React.Component {
    constructor(props) {
        super(props)
    }
    renderTableHeader() {
        return (
            <tr>
                <th>#</th>
                <th>שם</th>
                <th>כתובת</th>
                <th title="פתוח בשבת">פתוח בשבת</th>
                <th title="פתוח עכשיו">פתוח עכשיו</th>
            </tr>
        )
    }
    render() {
        let placeListHtml = <tr></tr>;
        console.log(this.props.placeList);
        let apiKey = this.props.apiKey;
        if (this.props.placeList) {

            placeListHtml = this.props.placeList.map(function (place, index) {
                return (
                    <Place
                        apiKey={apiKey}
                        key={index}
                        index={index}
                        place={place}
                    />
                );
            });
        }
        let placeListTable = null;
        if (this.props.placeList.length > 0) {
            let tableHeader = this.renderTableHeader();
            placeListTable = <div>
            <h1 className="text-info">תוצאות חיפוש: </h1>
                <table className="table table-striped" >
                    <thead>
                        {tableHeader}
                    </thead>
                    <tbody>
                        {placeListHtml}
                    </tbody>
                </table>
            </div>
        }

        return (
            <div id="placeList" className="col-md-6" >
                {placeListTable}
            </div>

        )
    }
}