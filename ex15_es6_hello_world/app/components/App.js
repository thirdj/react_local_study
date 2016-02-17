import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0
    }
    this.update = this.update.bind(this);
  }
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    })
  }
  render() {
    return (
      <div>
        <Slider ref="red" update={this.update} />
        <h1>{this.state.red}</h1>
        <hr />
        <Slider ref="green" update={this.update} />
        <h1>{this.state.green}</h1>
        <hr />
        <Slider ref="blue" update={this.update} />
        <h1>{this.state.blue}</h1>
      </div>
    )
  }
}

// const App = () => <h1>Hello Eggheads</h1>

class Slider extends React.Component {
  render() {
    return (
      <input type="range"
        ref="inp"
        min="0"
        max="255"
        onChange={this.props.update} />
    )
  }
}

const Widget = (props) => {
  console.log('props   ', props);
  return (
    <div>
      <input type="text" onChange={props.update} />
      <h1>{props.txt}</h1>
    </div>
  )
}

export default App;
