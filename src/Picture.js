import React from 'react';
import profileLogo from './profile-logo.svg';
import firebase from 'firebase';

const Picture = props => {
  return(
    <img className = "logo" src = {profileLogo}/>
  );
}

export default Picture;
