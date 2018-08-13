//FeedForm.js
import React, { Component } from 'react';

//should add posts list so can see individual user's posts
class FeedForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onMessageSubmit({ message: text });
    this.setState({ text: '' });
  }
  render() {
    return (
      <form  onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Leave a thought'
          value={ this.state.text }
          onChange={ this.handleTextChange } />
      </form>
    )
  }
}

export default FeedForm;
