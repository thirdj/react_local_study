import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    $.ajax({
      url: '/status',
      type: 'POST',
      dataType: 'json',
      data: { text: $(this.refs.textarea).val() },
      success: function(data) {
        $('.statuses').append(`<li>${data.text}</li>`);
        $(this.refs.textarea).val('')
      }
    });
  }
  render() {
    return(
      <div>
        <div className="new-status">
          <h2>New monolog</h2>
          <form action="">
            <textarea refs="textarea"></textarea><br>
            <input type="submit" value="Post" onSubmit={this.handleSubmit}>
          </form>
        </div>
        <div className="statuses">
          <h2>Monologs</h2>
          <ul></ul>
        </div>
      </div>
    )
  }

  ReactDom.render(
    <App />,
    document.getElementById('app')
  );
}
