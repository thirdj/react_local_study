import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      cor1: 0,
      cor2: 0,
      cor3: 0
    }
    this.update = this.update.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    })
  }
  updateColor(e) {
    this.setState({
      cor1: ReactDOM.findDOMNode(this.refs.cor1.refs.cor).value,
      cor2: ReactDOM.findDOMNode(this.refs.cor2.refs.cor).value,
      cor3: ReactDOM.findDOMNode(this.refs.cor3.refs.cor).value
    })
  }
  render() {
    const style = {
      backgroundColor: 'rgb(' + this.state.cor1 + ',' + this.state.cor2 + ',' + this.state.cor3 + ')',
      height: '200px',
      width: '100px'
    }
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

        <br /><br />
        <Color ref="cor1" updateColor={this.updateColor} />
        <Color ref="cor2" updateColor={this.updateColor} />
        <Color ref="cor3" updateColor={this.updateColor} />
        <div style={style}>
        </div>
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

class Color extends React.Component {
  render() {
    return (
      <input type="range"
        ref="cor"
        min="0"
        max="99"
        onChange={this.props.updateColor} />
    )
  }
}

const Widget = (props) => {
  return (
    <div>
      <input type="text" onChange={props.update} />
      <h1>{props.txt}</h1>
    </div>
  )
}

export default App;
