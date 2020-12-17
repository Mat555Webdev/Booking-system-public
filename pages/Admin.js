import React, { Component } from "react";
import { withRouter } from "next/router";
import uuid from "uuid";
import Link from "next/link";

import { Button, Table } from "reactstrap";

class Admin extends Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
      userbookings: [],
    };
  }
  //fetch data to view all users that have signed up
  componentDidMount() {
    fetch("/admin/viewusers")
      .then((res) => res.json())
      .then((result) => {
        result.filter((value) => {
          value.username === "admin";
        });
        this.setState({
          users: result,
        });
      })
      .catch((err) => alert(err));
  }
  //below function will delete a user
  deleteuser(id) {
    fetch("/admin/deleteUser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        window.location.reload();
      })
      .catch((err) => alert(err));
  }
  render() {
    return (
      <div id="root">
        <Link href="/">
          <Button color="warning" style={{margin:"8px"}}>Home</Button>
        </Link>
        <h1>Dashboard</h1>
        {/* map through the users to diplay for the admin */}
        <Table bordered>
          <thead>
            <tr>
              <th>Users</th>
              <th>Bookings</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((value) => {
              let id = value._id;

              if (this.state.users.length > 1) {
                //do not display the admin account
                if (value.username === "admin") {
                  return;
                } else {
                  return (
                    <tr key={uuid.v4()}>
                      <td key={uuid.v4()}>{value.username}</td>
                      <td>
                        <Link
                          key={uuid.v4()}
                          as="private"
                          href={`/userbookings?id=${value._id}`}
                        >
                          <Button
                            outline
                            color="info"
                            style={{ marginRight: "5px" }}
                          >
                            bookings
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          outline
                          color="danger"
                          onClick={() => this.deleteuser(id)}
                          id="deltUser"
                        >
                          Delete User
                        </Button>
                      </td>
                    </tr>
                  );
                }
              } else {
                return <div>No users have signed up yet</div>;
              }
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(Admin);
