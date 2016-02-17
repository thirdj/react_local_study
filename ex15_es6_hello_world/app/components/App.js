import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is state'
    }
    this.update = this.update.bind(this);
  }
  update(e) {
    this.setState({
      txt: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
        <Widget txt={this.state.txt} update={this.update} />
      </div>
    )
  }
}

// const App = () => <h1>Hello Eggheads</h1>

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
