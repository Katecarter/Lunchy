import React, { useState } from "react";
import { useFirebase } from "./Firebase";
import Restaurant from "./Restaurant/Restaurant";
import RestaurantForm from "./RestaurantForm/RestaurantForm";
import RestaurantInfoModal from "./Restaurant/RestaurantInfoModal";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useList } from "react-firebase-hooks/database";

import List from "@material-ui/core/List";
import { useAuthState } from "react-firebase-hooks/auth";
import { Planet } from "react-kawaii";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  title: {
    flexGrow: 1
  }
});

const App = props => {
  const firebase = useFirebase();
  const [user, loading, error] = useAuthState(firebase.auth);
  const classes = useStyles();

  // We're going to setup the React state of our component

  const [noteId, setNoteId] = useState("");

  const restaurantRef = React.useRef(
    firebase.database.ref().child("restaurant")
  );

  const [values, loadingList, errorList] = useList(restaurantRef.current);

  const addNote = note => {
    restaurantRef.current.push().set({
      title: note,
      description: "",
      upVotes: {}
    });
  };

  const addTitle = (noteId, title) => {
    restaurantRef.current.child(noteId).update({ title: title });
  };

  const addDescription = (noteId, description) => {
    restaurantRef.current.child(noteId).update({ description: description });
  };
  const upVote = (noteId, userId, user, votes) => {
    if (votes && votes[userId]) {
      restaurantRef.current.child(noteId + "/upVotes/" + userId).remove();
    } else {
      restaurantRef.current
        .child(noteId + "/upVotes/" + userId)
        .set({ id: userId, user: user });
    }
  };
  const removeRestaurant = noteId => {
    restaurantRef.current.child(noteId).remove();
  };
  const handleClose = () => {
    setNoteId("");
  };
  const handleOpen = noteId => () => {
    setNoteId(noteId);
  };

  return (
    <div id="root">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Lunchy[club]
          </Typography>
          {!user ? (
            <Button color="inherit" onClick={firebase.login}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={firebase.logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {user ? (
        <div>
          <List>
            {values.map(snap => {
              const note = snap.val();
              return (
                <Restaurant
                  user={user}
                  noteContent={note.title}
                  votes={note.upVotes}
                  noteId={snap.key}
                  key={snap.key}
                  description={note.description}
                  removeNote={removeRestaurant}
                  upVote={upVote}
                  handleOpen={handleOpen(snap.key)}
                />
              );
            })}
          </List>
          <RestaurantInfoModal
            open={Boolean(noteId)}
            handleClose={handleClose}
            addDescription={addDescription}
            addTitle={addTitle}
            noteId={noteId}
          />
          <div>
            <RestaurantForm addNote={addNote} />
          </div>
        </div>
      ) : (
        <div>
          Please Log in To Vote
          <Planet size={400} mood="sad" color="#FDA7DC" />
        </div>
      )}
    </div>
  );
};

export default App;
