import React, { Component } from 'react';
import { render } from 'react-dom';

let Mixin = InnerComponent => class extends Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
/*
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
*/
    this.updateButton = this.updateButton.bind(this);
  }
  componentWillMount() {
    console.log('will mount');
  }
  componentDidMount() {
    console.log('mounted');
  }
  updateButton(e) {
    this.setState({
      val: this.state.val + 1
    })
  }
  render() {
    return (
      <InnerComponent
      updateButton={this.updateButton}
      {...this.state}
      {...this.props} />
    )
  }
}

const Button = (props) => <button onClick={props.updateButton}>{props.txt} - {props.val}</button>
const Label = (props) => <label onMouseMove={props.updateButton}>{props.txt} - {props.val}</label>

let ButtonMixed = Mixin(Button);
let LabelMixed = Mixin(Label);

class App extends Component {
  update(e) {
    this.setState({
      red: render.findDOMNode(this.refs.red.refs.inp).value,
      green: render.findDOMNode(this.refs.green.refs.inp).value,
      blue: render.findDOMNode(this.refs.blue.refs.inp).value
    })
  }
  updateColor(e) {
    this.setState({
      cor1: render.findDOMNode(this.refs.cor1.refs.cor).value,
      cor2: render.findDOMNode(this.refs.cor2.refs.cor).value,
      cor3: render.findDOMNode(this.refs.cor3.refs.cor).value
    })
  }

  render() {
/*
    const style = {
      backgroundColor: 'rgb(' + this.state.cor1 + ',' + this.state.cor2 + ',' + this.state.cor3 + ')',
      height: '200px',
      width: '100px'
    }
*/
    return (
      <div>
        <ButtonMixed txt="Button" />
        <LabelMixed txt="Label" />
      </div>
      /*
      <button onClick={this.updateButton}>
        {this.props.txt} - {this.state.val}
      </button>
      */
/*
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
        <Color ref="cor1" updateColor={this.updateColor} />{this.state.cor1}
        <Color ref="cor2" updateColor={this.updateColor} />{this.state.cor2}
        <Color ref="cor3" updateColor={this.updateColor} />{this.state.cor3}
        <div style={style}>
        </div>
      </div>
*/
    )
  }
}

class Slider extends Component {
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

class Color extends Component {
  render() {
    return (
      <input type="range"
        ref="cor"
        min="0"
        max="255"
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
