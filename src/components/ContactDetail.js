import React from "react";
import user from "../images/contact.png";
import { Link } from "react-router-dom";
import {
    Button,
    Grid    
} from "semantic-ui-react";   
const ContactDetail = (props) => {
  const { name, email } = props.location.state.contact;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div centered">
        <Link to="/">
          <Grid>
            <Grid.Column textAlign="center">
              <Button className="ui button blue">Back to Contact List</Button>
            </Grid.Column>
          </Grid>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
