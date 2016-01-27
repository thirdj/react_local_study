var testData = [
  { name: 'choi', inChargeOf: 'gag1', generation: '1' },
  { name: 'park', inChargeOf: 'gag2', generation: '2' },
  { name: 'leee', inChargeOf: 'gag3', generation: '3' }
];

var SegoDiv = React.createClass({
  getInitialState: function() {
    return {
      rsup: this.props.rsup,
      nameFilter: ''
    }
  },
  formChanged: function() {
    this.setState({});
  },
  onSearch: function(name) {
    if (!name) name = '';
    this.setState({
      nameFilter: name
    });
  },
  render: function(){
    var memberArr = [];

    if (this.state.rsup && this.state.rsup.length > 0) {
      this.state.rsup.forEach(function(rsup) {
        if (rsup.name.indexOf(this.state.nameFilter) === -1) {
          return;
        }
        memberArr.push(
          <div>
            이름: {rsup.name}
            , 담당: {rsup.inChargeOf}
            , 세대: {rsup.generation}
          </div>
        );
      }.bind(this));
    }
    return (
      <div>
        <SegoForm onFormChange={this.formChanged} memberArr={this.props.rsup} />
        <div>
          {memberArr}
        </div>
        <SegoSearch onSearch={this.onSearch} />
      </div>
    );
  }
});

var SegoSearch = React.createClass({
  handleChange: function(e) {
    this.props.onSearch(this.refs.name.getDOMNode().value.trim());
  },
  render: function(){
    return (
      <div>
        <form>
          이름으로 찾기 :
          <input
            type="text"
            placeholder="이름"
            onChange={this.handleChange}
            value={this.props.name}
            ref="name" />
        </form>
      </div>
    );
  }
});

var SegoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var name = this.refs.name.getDOMNode().value.trim()
      , inChargeOf = this.refs.inChargeOf.getDOMNode().value.trim()
      , generation = this.refs.generation.getDOMNode().value.trim();

    if (!name || !inChargeOf || !generation) {
      console.warn('fill ');
      return false;
    }

    this.props.memberArr.push({ name:name, inChargeOf:inChargeOf, generation:generation });
    this.props.onFormChange(this.props.memberArr);

    this.refs.name.getDOMNode().value = '';
    this.refs.inChargeOf.getDOMNode().value = '';
    this.refs.generation.getDOMNode().value = '';
    this.componentDidMount();
  },
  componentDidMount: function(){
    // 렌더링 될 때 함수를 호출 함.
    this.refs.name.getDOMNode().focus();
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="이름" ref="name" autoFocus maxLength="5"/>
          <input type="text" placeholder="담당" ref="inChargeOf" maxLength="5"/>
          <input type="text" placeholder="세대" ref="generation" maxLength="5"/>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});

React.render(<SegoDiv rsup={testData}/>, document.body);
