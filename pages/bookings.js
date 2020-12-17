import { withRouter } from "next/router";
import React, { Component } from "react";
//components
import Header from "../components/Header";
import Viewbooking from "../components/viewBooking";

class bookings extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false,
      bookings: [],
      zerobookings: true,
      user: {
        id: "",
        username: "",
      },
    };
  }
  componentDidMount() {
    // code below will check if a user is logged in and set the state to loggedin
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
          //below code will make a http get request to view all bookings
          fetch("/viewbooking", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userID: this.state.user.id,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              this.setState({
                bookings: result,
              });
              if (this.state.bookings.length !== 0) {
                this.setState({
                  zerobookings: false,
                });
              }
            })
            .catch((err) => alert(err));
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Header
          loggedIn={this.state.loggedIn}
          user={this.state.user.username}
        />
        <Viewbooking
          loggedIn={this.state.loggedIn}
          bookings={this.state.bookings}
          zerobookings={this.state.zerobookings}
        />
      </div>
    );
  }
}

export default withRouter(bookings);
