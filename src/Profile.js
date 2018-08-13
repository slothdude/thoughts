import React, { Component } from 'react';
import firebase from 'firebase';
import autobind from 'class-autobind';
import Dropzone from 'react-dropzone';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { accepted:[], rejected:[], image: null };
    autobind(this);
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
    var propicRef = firebase.database().ref(`users/${userId}/images/propic`);
    propicRef.on('value', snapshot => {
      console.log(snapshot.val());
      //get image in database for display and store in state
    });
  }
  //add image into render function
  render() {
    return (
      <div>
        <Dropzone
          accept="image/*"
          onDrop= {this.onDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    )
  }
}

export default Profile;
