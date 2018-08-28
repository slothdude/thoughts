import React, {Component} from 'react';
import profileLogo from './profile-logo.svg';
import firebase from 'firebase';

class Picture extends Component {
  state = {propicURL: profileLogo};

  componentDidMount(){
    var urlRef = firebase.database().ref(`users/${this.props.id}/data/propicURL`);
      urlRef.on('value', snapshot => {
      console.log(snapshot.val());
      this.setState({propicURL: snapshot.val()});
    });
  }

  render(){
    return(
      <img className = "logo" src = {this.state.propicURL} alt = "your propic"/>
    );
  }
}

export default Picture;
