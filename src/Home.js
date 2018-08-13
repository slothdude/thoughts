import React, { Component } from 'react';
import FeedForm from './FeedForm.js';
import Banner from './Banner.js';
import firebase from 'firebase';
import NewsFeed from './NewsFeed.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Profile from './Profile.js';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = { posts: [] };
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  //passed as prop to FeedForm (input box)
  handleMessageSubmit(message) {
    const { currentUser } = firebase.auth();
    var userId = currentUser.uid;
    var databaseRef = firebase.database().ref('posts/test1').push();
    databaseRef.set({ user: userId, message: message.message });
    var userRef = firebase.database().ref(`users/${userId}/posts`).push();
    userRef.set({ message: message.message });
  }

  render() {
    //hosts the input and newsfeed components
    return (
      <div className="App">
        <Banner />
        <div className="App">
          <Link to="/profile">Profile page</Link>
          <FeedForm onMessageSubmit = {this.handleMessageSubmit}/>
          <NewsFeed />
        </div>
      </div>

    );
  }
}

export default Home;
