import React, { useState, useEffect } from 'react';
import { useFirebase } from './Firebase';
import Restaurant from './Restaurant/Restaurant';
import RestaurantForm from './RestaurantForm/RestaurantForm';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import { useAuthState } from 'react-firebase-hooks/auth';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const App = (props) => {

  const firebase = useFirebase();
  const [user, loading, error] = useAuthState(firebase.auth);
  const classes = useStyles();
  console.log(user, loading, error);

  // We're going to setup the React state of our component
  const [notes, setNotes] = useState([]);
  console.log(firebase);
  const notesRef = React.useRef(firebase.database.ref().child('notes'));
  useEffect(() => {

    // DataSnapshot
    notesRef.current.on('child_added', snap => {
      setNotes(prevNotes => {
        prevNotes.push({
          id: snap.key,
          noteContent: snap.val().noteContent,
        })
        return [...prevNotes]
      });
    })

    notesRef.current.on('child_removed', snap => {
      setNotes(prevNotes => {
        for (var i = 0; i < prevNotes.length; i++) {
          if (prevNotes[i].id === snap.key) {
            prevNotes.splice(i, 1);
          }
        }
        return [...prevNotes]
      });
    })
  }, [])

  const addNote = (note) => {
    notesRef.current.push().set({ noteContent: note });
  }
  const removeNote = (noteId) => {

    notesRef.current.child(noteId).remove();
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Lunchy[club]
        </Typography>
          <button onClick={firebase.login}>Login</button>
        </Toolbar>
      </AppBar>
      <List>
        {
          notes.map((note) => {
            return (
              <Restaurant noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
                removeNote={removeNote}
              />
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