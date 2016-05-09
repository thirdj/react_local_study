import React from 'react';
// import LocationList from './LocationList';
import moment from 'moment';

class LocationItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.address);
  }
  render() {
    let cn = 'list-group-item';

    if (this.props.active) {
      cn += ' active-location';
    }
    return (
      <a className={cn} onClick={this.handleClick}>
        {this.props.address}
        <span className="createdAt">{moment(this.props.timestamp).fromNow()}</span>
        <span className="glyphicon glyphicon-menu-right"></span>
      </a>
    );
  }
}

export default LocationItem;
