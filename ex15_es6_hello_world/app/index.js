import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

// class App extends React.Component {
//   render() {
//     return <h1>Hello World</h1>
//   }
// }

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txt: 'this is the default txt'
}

ReactDom.render (
  <App cat={5}/>,
  document.getElementById('app')
);
