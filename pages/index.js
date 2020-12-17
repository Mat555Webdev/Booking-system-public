//the index page is going to be used for the login page
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import React, { Component } from "react";
import Rooms from "../components/Rooms";

//components
import Header from "../components/Header";

class index extends Component {
  constructor(props) {
    super();
    this.state = {
      admin: false,
      loggedIn: false,
      user: {
        id: "",
        username: "",
      },
    };
  }
  // code below will check if a user is logged in and set the state to loggedin
  componentDidMount() {
    fetch("/usercheck")
      .then((res) => res.json())
      .then((result) => {
        if (result.user === null) {
          this.setState({
            loggedIn: false,
            user: {
              id: null,
              username: null,
            },
          });
        } else if (result.user !== null) {
          this.setState({
            loggedIn: true,
            user: {
              id: result._id,
              username: result.username,
            },
          });
        }
        console.log();
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <div>
          <Header
            loggedIn={this.state.loggedIn}
            id={this.state.user.id}
            user={this.state.user.username}
          />
          <Rooms loggedIn={this.state.loggedIn} session={this.state.user} />
        </div>
      </div>
    );
  }
}

export default withRouter(index);
