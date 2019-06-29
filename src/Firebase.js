import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBzgoMD5Q8ImlYUuFNbcJbrmXau8BioQFQ",
  authDomain: "lunchy-a4a0c.firebaseapp.com",
  databaseURL: "https://lunchy-a4a0c.firebaseio.com",
  projectId: "lunchy-a4a0c",
  storageBucket: "lunchy-a4a0c.appspot.com",
  messagingSenderId: "418058350962",
  appId: "1:418058350962:web:598b99d215727fe4"
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.database();

  }

  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.auth.signInWithRedirect(provider);
  };

  logout = () => this.auth.signOut();

}

export default Firebase;

const FirebaseContext = React.createContext(undefined);
export { FirebaseContext };

export function useFirebase() {
  const fb = React.useContext(FirebaseContext);
  if (fb === undefined) {
    throw new Error('must be used in a useContext');
  }
  return fb;
}