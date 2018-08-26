import React, { Component } from 'react';
import firebase from 'firebase';
import autobind from 'class-autobind';
import Dropzone from 'react-dropzone';
import Banner from './Banner';
import { withRouter } from 'react-router'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { accepted:[], rejected:[], image: null, name: "",
                   nameField: "", userId: "" };
    autobind(this);
  }

  handleNameFieldChange(e) {
    this.setState({ nameField: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    let text = this.state.nameField.trim();
    if (!text) {
      return;
    }
    var userId = this.state.userId;
    var nameRef = firebase.database().ref(`users/${userId}/data`);
    nameRef.update({name: this.state.nameField});
    this.setState({ nameField: '' });
  }

  onDrop(accepted, rejected) {
    this.setState({ accepted, rejected });
    const { currentUser } = firebase.auth();
    var userId = currentUser.uid;
    var propicRef = firebase.database().ref(`users/${userId}/images/propic`);
    //upload image to s3
    //store image url in propicRef
    //update state
  }

  componentWillMount(){
    const { currentUser } = firebase.auth();
    var userId = currentUser.uid;
    this.setState({userId});
    var nameRef = firebase.database().ref(`users/${userId}/data/name`);
    var propicRef = firebase.database().ref(`users/${userId}/images/propic`);
    nameRef.on('value', snapshot => {
      var name = snapshot.val();
      this.setState({name});
    });
    // propicRef.on('value', snapshot => {
    //   console.log(snapshot.val());
    //   //get image in database for display and store in state
    // });
  }
  //add image into render function
  render() {
    return (
      <div className = "App">
        <Banner />
        <p>Current name: {this.state.name}</p>
        <form  onSubmit={ this.handleSubmit }>
          <input
            type='text'
            placeholder='Enter a new name'
            value={ this.state.nameField }
            onChange={ this.handleNameFieldChange } />
        </form>
        <Dropzone
          accept="image/*"
          onDrop= {this.onDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    )
  }
}

export default withRouter(Profile);
