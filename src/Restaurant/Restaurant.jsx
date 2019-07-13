import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Planet } from "react-kawaii";
import Divider from "@material-ui/core/Divider";
import UpVote from "@material-ui/icons/ThumbUp";
import EditIcon from "@material-ui/icons/Edit";

const Restaurant = props => {
  const handleRemoveNote = id => {
    props.removeNote(id);
  };
  const getVoteLength = () => {
    let size = 0,
      key;
    for (key in props.votes) {
      if (props.votes.hasOwnProperty(key)) size++;
    }
    return size;
  };
  console.log("HEY", props.description);

  return (
    <React.Fragment>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Planet size={40} mood="blissful" color="#FDA7DC" />
        </ListItemAvatar>
        {props.user.email === "katiekatelyn4455@gmail.com" && (
          <Button onClick={() => handleRemoveNote(props.noteId)}>
            &times;
          </Button>
        )}
        <ListItemText>{props.noteContent}</ListItemText>
        <div>{props.description}</div>
        <Button onClick={props.handleOpen}>
          <EditIcon />
        </Button>
        <Badge badgeContent={getVoteLength()} color="primary">
          <Button
            onClick={() =>
              props.upVote(props.noteId, props.user.uid, props.user.email)
            }
          >
            <UpVote />
          </Button>
        </Badge>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

Restaurant.propTypes = {
  noteContent: PropTypes.string
};

export default Restaurant;
