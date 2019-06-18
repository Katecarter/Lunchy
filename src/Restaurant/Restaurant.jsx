import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Planet } from 'react-kawaii';
import Divider from '@material-ui/core/Divider';
import UpVote from '@material-ui/icons/ThumbUp';
import DownVote from '@material-ui/icons/ThumbDown';




const Restaurant = (props) => {


  const handleRemoveNote = (id) => {
      props.removeNote(id);
  }

  return(
    <React.Fragment>
    <Divider/>
    <ListItem>
      <ListItemAvatar>
      <Planet size={40} mood="blissful" color="#FDA7DC" />
      </ListItemAvatar>
      <Button
            onClick={() => handleRemoveNote(props.noteId)}>
            &times;
      </Button>
      <ListItemText>{ props.noteContent }</ListItemText>
      <Button>
        <UpVote/>
      </Button>
      <Button>
        <DownVote/>
      </Button>
    </ListItem>
    <Divider/>
    </React.Fragment>
  )
}

Restaurant.propTypes = {
    noteContent: PropTypes.string
}

export default Restaurant;