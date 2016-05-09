import React from 'react';
import GMaps from 'GMaps';
import Search from './Search';
import Map from './Map';
import CurrentLocation from './CurrentLocation';
import LocationList from './LocationList';

class App extends React.Component {
  constructor(props) {
    super(props);

    let favorites = [];
    if (localStorage.favorites) {
      favorites = JSON.parse(localStorage.favorites);
    }
    this.state = {
      favorites,
      currentAddress: '프랑스 파리',
      mapCoordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
    };

    this.isAddressInFavorites = this.isAddressInFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.searchForAddress = this.searchForAddress.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }
  toggleFavorite(address) {
    if (this.isAddressInFavorites(address)) {
      this.removeFromFavorites(address);
    } else {
      this.addToFavorites(address);
    }
  }
  addToFavorites(address) {
    const favorites = this.state.favorites;
    favorites.push({
      address,
      timestamp: Date.now()
    });
    this.setState({
      favorites
    });
    localStorage.favorites = JSON.stringify(favorites);
  }
  removeFromFavorites(address) {
    const favorites = this.state.favorites;
    let index = -1;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].address === address) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      favorites.slice(index, 1);
      this.setState({
        favorites
      });
      localStorage.favorites = JSON.stringify(favorites);
    }
  }
  isAddressInFavorites(address) {
    const favorites = this.state.favorites;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].address === address) {
        return true;
      }
    }
    return false;
  }
  searchForAddress(address) {
    const self = this;
    GMaps.geocode({
      address,
      callback(results, status) {
        if (status !== 'OK') return;
        const latlng = results[0].geometry.location;

        self.setState({
          currentAddress: results[0].formatted_address,
          mapCoordinates: {
            lat: latlng.lat(),
            lng: latlng.lng()
          }
        });
      }
    });
  }
  render() {
    return (
      <div>
				<h1>Your Google Maps Locations</h1>
				<Search onSearch={this.searchForAddress} />
				<Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
        <CurrentLocation
          address={this.state.currentAddress}
          favorite={this.isAddressInFavorites(this.state.currentAddress)}
          onFavoriteToggle={this.toggleFavorite}
        />

        <LocationList
          locations={this.state.favorites}
          activeLocationAddress={this.state.currentAddress}
          onClick={this.searchForAddress}
        />
			</div>
    );
  }
}

export default App;
