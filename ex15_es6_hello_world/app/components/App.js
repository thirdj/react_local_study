import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is state',
      cat: 0
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
        <input type="text" onChange={this.update} />
        <h1>{this.state.txt}</h1>
      </div>
    )
  }
}

// const App = () => <h1>Hello Eggheads</h1>

export default App;
