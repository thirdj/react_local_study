import React from 'react';
import LocationItem from './LocationItem';

class LocationList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const locations = this.props.locations.map((l, idx) => {
      const active = this.props.activeLocationAddress === l.address;

      return (
        <LocationItem
          address={l.address}
          timestamp={l.timestamp}
          active={active}
          onClick={this.props.onClick}
          key={l + idx}
        />
      );
    });
    if (!locations.length) {
      return null;
    }
    return (
      <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
        <span className="list-group-item active">Saved Locations</span>
        {locations}
      </div>
    );
  }
}

export default LocationList;
