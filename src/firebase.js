import firebase from 'firebase';
// /app
//import 'firebase/auth';
//import 'firebase/database';
//import 'firebase/datastore';

// Initalize and export Firebase.
const config = {
  apiKey: "AIzaSyAAzYbrLDqN_8vs7CGa-CAPh3hmUs_P_90",
  authDomain: "konnex-29e35.firebaseapp.com",
  databaseURL: "https://konnex-29e35.firebaseio.com",
  projectId: "konnex-29e35",
  storageBucket: "konnex-29e35.appspot.com",
  messagingSenderId: "870390669868"
};
export default firebase.initializeApp(config);
