//FeedForm.js
import React, { Component } from 'react';
import firebase from 'firebase';

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

  handleMessageSubmit(message) {
    const { currentUser } = firebase.auth();
    var userId = currentUser.uid;
    var databaseRef = firebase.database().ref('posts').push();
    databaseRef.set({ user: userId, message: message.message });
    var userRef = firebase.database().ref(`users/${userId}/posts`).push();
    userRef.set({ message: message.message });
  }

  handleSubmit(e) {
    e.preventDefault();
    let text = this.state.text.trim();
    if (!text)
      return;
    this.handleMessageSubmit({ message: text });
    this.setState({ text: '' });
  }

  render() {
    return (
      <form  onSubmit={ this.handleSubmit }>
        <input
          className = "FeedForm"
          type='text'
          placeholder='Leave a thought'
          value={ this.state.text }
          onChange={ this.handleTextChange } />
      </form>
    )
  }
}

export default FeedForm;
