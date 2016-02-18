import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

  constructor(props) {
    super(props);

    this.state = {
      red: 0
    }
    this.update = this.update.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
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
/*
      <div>
        <ButtonMixed txt="Button" />
        <LabelMixed txt="Label" />
      </div>

      <button onClick={this.updateButton}>
        {this.props.txt} - {this.state.val}
      </button>
      */

      <div>
        <NumInput ref="red"
          min={0}
          max={255}
          step={1}
          val={+this.state.red}
          type="number"
          label="Red"
          update={this.update}
        />
        <h1>{this.state.red}</h1>
      </div>

    )
  }
}

class NumInput extends Component {
  render() {
    let label = this.props.label !== '' ?
      <label>{this.props.label} - {this.props.val}</label> : '';
    return (
      <div>
        <input
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.val}
          ref="inp"
          onChange={this.props.update} />
          {label}
      </div>
    )
  }
}

NumInput.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    val: React.PropTypes.number,
    label: React.PropTypes.string,
    update: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['number', 'range'])
}

NumInput.defaultProps = {
  min: 0,
  max: 0,
  step: 1,
  val: 0,
  label: '',
  type: 'range'
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
