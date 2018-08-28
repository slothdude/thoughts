import React, { Component } from 'react';
import firebase from 'firebase';
import autobind from 'class-autobind';
import Dropzone from 'react-dropzone';
import Banner from './Banner';
import profileLogo from './profile-logo.svg';
import { withRouter } from 'react-router'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { accepted:[], rejected:[], image: null, name: "",
                   nameField: "", propicURL: profileLogo, userId: "",
                   uploadpercent: 0 };
    autobind(this);
  }

  handleNameFieldChange(e) {
    this.setState({ nameField: e.target.value });
  }

  //handle new name submit
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

  //handle when file is selected for upload
  onDrop(e) {
    var file = e[0];
    var storageRef = firebase.storage().ref();
    var propicRef = storageRef.child(`propics/${this.state.userId}/${file.name}`);
    var uploadTask = propicRef.put(file);
    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      const { currentUser } = firebase.auth();
      var userId = currentUser.uid;
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        var dataRef = firebase.database().ref(`users/${userId}/data`);
        dataRef.update({propicURL: downloadURL});
      });
    });
  }

  componentDidMount(){
    const { currentUser } = firebase.auth();
    var userId = currentUser.uid;
    this.setState({userId});
    //get current name
    var nameRef = firebase.database().ref(`users/${userId}/data/name`);
    nameRef.on('value', snapshot => {
      var name = snapshot.val();
      this.setState({name});
    });
    //update state with propic url in database, if none then keep using default
    var urlRef = firebase.database().ref(`users/${userId}/data/propicURL`);
      urlRef.on('value', snapshot => {
      console.log(snapshot.val());
      if(snapshot.val() != null)
        this.setState({propicURL: snapshot.val()});
    });
  }

  render() {
    return (
      <div className = "App">
        <Banner />
        <form  onSubmit={ this.handleSubmit }>
          <input
            className = "FeedForm"
            type='text'
            placeholder='Enter a new name'
            value={ this.state.nameField }
            onChange={ this.handleNameFieldChange } />
        </form>
        <p>Current name: {this.state.name}</p>
        <input
          type = "file"
          accept = "image/*"
          onChange = { (e) => this.onDrop(e.target.files)}
        />
        <p>Current picture:</p>
        <img src = {this.state.propicURL} className = 'logo'/>
      </div>
    )
  }
}

export default withRouter(Profile);
