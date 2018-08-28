import React, { Component } from 'react';
import FeedForm from './FeedForm.js';
import Banner from './Banner.js';
import NewsFeed from './NewsFeed.js';

//Newsfeed page 
const Home = props => {
  return
  (
    <div className="App">
      <Banner />
      <div className="App">
        <FeedForm onMessageSubmit = {this.handleMessageSubmit}/>
        <NewsFeed />
      </div>
    </div>
  );
}

export default Home;
