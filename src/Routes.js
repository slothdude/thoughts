import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.js';
import Home from './Home.js';


class Routes extends Component {
  constructor(props){
    super();
    this.state = {loggedIn: null}
  }
  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //     var displayName = user.displayName;
  //     var email = user.email;
  //     var emailVerified = user.emailVerified;
  //     var photoURL = user.photoURL;
  //     var isAnonymous = user.isAnonymous;
  //     var uid = user.uid;
  //     var providerData = user.providerData;
  //     this.setState({loggedIn: user});
  //     // ...
  //   } else {
  //     this.setState({loggedIn: null});
  //     // ...
  //   }
  // });
  render(){
    return(
      <div>
        <Route exact path = '/' component={App}/>
        <Route path='/home' component={Home}/>
      </div>
    );
  }
}

export default Routes;
