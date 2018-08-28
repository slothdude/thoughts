import React, {Component} from 'react';
import profileLogo from './profile-logo.svg';
import firebase from 'firebase';

class Picture extends Component {
  state = {propicURL: profileLogo};

  componentDidMount(){
    //fill state with propicURL from user data in database
    var urlRef = firebase.database().ref(`users/${this.props.id}/data/propicURL`);
      urlRef.on('value', snapshot => {
        console.log(snapshot.val());
        this.setState({propicURL: snapshot.val()});
    });
  }

  render(){
    //uses a div instead of an image for automatic cropping
    return(
      <div className = "thumb"
           style = {{backgroundImage: `url(${this.state.propicURL})`}}
           alt = "your propic"/>
    );
  }
}

export default Picture;
