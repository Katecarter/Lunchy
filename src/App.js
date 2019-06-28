import React, { useState, useEffect } from 'react';
import Restaurant from './Restaurant/Restaurant';
import RestaurantForm from './RestaurantForm/RestaurantForm';
import { firebase } from '@firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'firebase/database';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import List from '@material-ui/core/List';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

var DB_CONFIG = {
  apiKey: "AIzaSyBzgoMD5Q8ImlYUuFNbcJbrmXau8BioQFQ",
  authDomain: "lunchy-a4a0c.firebaseapp.com",
  databaseURL: "https://lunchy-a4a0c.firebaseio.com",
  projectId: "lunchy-a4a0c",
  storageBucket: "lunchy-a4a0c.appspot.com",
  messagingSenderId: "418058350962",
  appId: "1:418058350962:web:598b99d215727fe4"
};

const getDatabase = (app) => {
  console.log(app, 'APP');
  const value = app.database().ref().child('notes')
  console.log(value, 'value');
  return value;
};

const App = (props) => {
  const classes = useStyles();
  const [app, setApp] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: new firebase.auth.GoogleAuthProvider(),
    callbacks: {
      signInSuccess: () => false
    }
  }


  // We're going to setup the React state of our component
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const tempApp = firebase.initializeApp(DB_CONFIG);
    setApp(tempApp);

    firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    })

    // DataSnapshot
    if (tempApp) {
      const database = getDatabase(tempApp);
      database.on('child_added', snap => {
        setNotes(prevNotes => {
          prevNotes.push({
            id: snap.key,
            noteContent: snap.val().noteContent,
          })
          return [...prevNotes]
        });
      })

      database.on('child_removed', snap => {
        setNotes(prevNotes => {
          for (var i = 0; i < prevNotes.length; i++) {
            if (prevNotes[i].id === snap.key) {
              prevNotes.splice(i, 1);
            }
          }
          return [...prevNotes]
        });
      })
    }
  }, [])

  const addNote = (note) => {
    if (app) {
      const database = getDatabase(app);
      database.push().set({ noteContent: note });
    }
  }

  const removeNote = (noteId) => {
    console.log("from the parent: " + noteId);
    if (app) {
      const database = getDatabase(app);
      database.child(noteId).remove();
    }
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Lunchy[club]
        </Typography>
          {!isSignedIn
            ? <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
            : <Button color="inherit" >Logout</Button>
          }
          <Button color="inherit" >Logout</Button>
        </Toolbar>
      </AppBar>
      <List>
        {
          notes.map((note) => {
            return (
              <Restaurant noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
                removeNote={removeNote} />
            )
          })
        }
      </List>
      <div>
        <RestaurantForm addNote={addNote} />
      </div>
    </div>
  );
}

export default App;