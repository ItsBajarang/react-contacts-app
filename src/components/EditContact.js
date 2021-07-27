import React from "react";
import { withRouter } from "react-router";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;

    this.state = {
      id,
      name,
      email,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (e.target.name === "" || e.target.email === "") {
      alert("All the fields are mandatory");
      return;
    }
    this.props.editContactHandler(this.state);
    this.setState({ name: "", email: "" });
    console.log("this.props", this.props);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="ui main">
        <h2>Edit Contact </h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditContact);
