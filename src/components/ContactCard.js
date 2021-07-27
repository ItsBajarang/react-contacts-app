import React from "react";
import contactIcon from "../images/contact.png";
import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    props.clickHandler(id);
  };

  return (
    <div className="item" style={{ position: "relative" }}>
      <img className="ui avatar image" src={contactIcon} alt="User" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>

      <Link
        to={{ pathname: `/edit/${id}`, state: { contact: props.contact } }}
      >
        <i
          className="edit alternate outline icon"
          style={{
            color: "blue",
            paddingTop: "0px",
            position: "absolute",
            right: "35px",
            top: "10px",
            cursor: "pointer",
          }}
        />
      </Link>

      <i
        className="trash alternate outline icon"
        onClick={handleClickOpen}
        style={{
          color: "red",
          paddingTop: "0px",
          position: "absolute",
          right: "10px",
          top: "10px",
          cursor: "pointer",
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete a Contact?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactCard;
