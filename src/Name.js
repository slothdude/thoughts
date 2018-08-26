import React, { Component } from 'react';
import firebase from 'firebase';
import autobind from 'class-autobind';

class Name extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {name: ""};
  }

  componentWillMount(){
    var nameRef = firebase.database().ref(`users/${this.props.id}/data/name`);
    nameRef.on('value', snapshot => {
      var name = snapshot.val();
      console.log(name);
      this.setState({name});
    });
  }

  render(){
    return(
      <p>{this.state.name}</p>
    )
  }

}

export default Name;
