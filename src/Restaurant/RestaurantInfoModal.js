import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const DialogTitle = props => {
  const { children, onClose } = props;
  return (
    <MuiDialogTitle disableTypography>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const RestaurantInfoModal = props => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.addDescription(props.noteId, description);
    props.addTitle(props.noteId, title);
    props.handleClose();
  };
  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleEvent = event => {
    setDescription(event.target.value);
  };
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        Modal title
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <MuiDialogContent dividers>
          <div>Title</div>
          <TextField onChange={handleTitle} />
          <div>Description</div>
          <TextField onChange={handleEvent} />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button type="submit" color="primary">
            Save changes
          </Button>
        </MuiDialogActions>
      </form>
    </Dialog>
  );
};

export default RestaurantInfoModal;
