//Basically only the login screen, handles account creation and login
//Once you log in(auto on creation), the render function handles entering the rest of the app
import React, { Component } from 'react';

import firebase from 'firebase';
//logo from https://www.iconfinder.com/icons/667355/aha_brilliance_idea_think_thought_icon
import logo from './thoughts-logo.svg';
import profileLogo from './profile-logo.svg';
import autobind from 'class-autobind';
import LoginForm from './LoginForm.js';
import Home from './Home.js';
import NewAccountForm from './NewAccountForm.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Profile from './Profile.js';

class App extends Component {

  constructor(props){
    super();
    //user is not guaranteed to be logged in but LoggedIn is, they both represent the current user
    this.state = {loggedIn: null, user: null};
    autobind(this);
  }

  //initializes the app, example of entering object into database
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyBZOyF627hAaFOEak5sZK--8XCSejQQLt0",
      authDomain: "thoughts-e2e25.firebaseapp.com",
      databaseURL: "https://thoughts-e2e25.firebaseio.com",
      projectId: "thoughts-e2e25",
      storageBucket: "thoughts-e2e25.appspot.com",
      messagingSenderId: "911129959870"
    });
    document.title = "Thoughts..?";
  }

  //helper function to set user upon login because was getting an error on "this" in anonymous function
  onLogin(){
    this.setState({loggedIn: firebase.auth().currentUser});
  }

  //triggers when someone fills out the "create a new account" section
  handleAccountSubmit(user) {
    this.setState({user: user});
    //if the password and password confirmation don't match, reject
    if(user.password !== user.passwordConfirm){
      alert('Passwords do not match');
    }
    else {
      //add user data to the database under users/id/data
      console.log(user);
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        const { currentUser } = firebase.auth();
        var userRef = firebase.database().ref(`users/${currentUser.uid}/data`);
        userRef.set({uid: currentUser.uid, email: currentUser.email,
                     name: currentUser.uid});
        console.log('success creation of acc, check user database');
        this.onLogin();
      })
      .catch(function(error) {
      //Handle Errors
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode || errorMessage){
          alert(errorMessage);
          console.log(errorCode + errorMessage);
        }
      });
    }
  }

  //triggered when someone logs in normally, passed in as a prop to LoginForm component
  handleLogin(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      console.log("logged in")
      this.onLogin();
    })
    .catch(function(error) {
      // Handle Errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error" + errorCode + errorMessage);
    });
  }

  render() {
    if(!this.state.loggedIn){
      return (
        <div className = "App">
          <LoginForm onLogin = {this.handleLogin}/>
          <img src = {logo} className = "App-logo"/>
          <h3>Sign up for Thoughts</h3>
          <NewAccountForm onAccountSubmit = {this.handleAccountSubmit} />
        </div>
      );
    } else {
      //logged in
      return(
        //just typing it in will make you log in again because there is no login persistance yet.
        <BrowserRouter>
          <div>
            <Route exact path="/"
                   component ={() => <Home user = {this.state.loggedIn}/>}
            />
            <Route exact path="/profile"
                   component ={() => <Profile user = {this.state.loggedIn}/>}
            />
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
