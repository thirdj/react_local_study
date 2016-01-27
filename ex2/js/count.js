var CountDiv = React.createClass({
  getInitialState: function(){
    return {
      count: 1
    }
  },
  onChange: function(){
    this.setState({
      count: this.state.count + 1
    });
    if (this.state.count == 6) {
      console.log('this count is six!!!!');
    }
  },
  render: function(){
    return (
      <div>
        <div>{this.state.count}</div>
        <button type="button" onClick={this.onChange}>inspectrease</button>
      </div>
    );
  }
});

React.render(<CountDiv/>, document.getElementById('point'));
