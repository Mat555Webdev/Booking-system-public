import React, { Component } from "react";
import { withRouter } from "next/router";
import uuid from "uuid";
import Link from "next/link";

import { Table, Button } from "reactstrap";

export class userbookings extends Component {
  constructor(props) {
    super();
    this.state = {
      userbookings: [],
      zerobookings: true,
    };
  }
  static getInitialProps({ query }) {
    return { query };
  }
  //code below will fetch all bookings of the user selected by the admin
  componentDidMount() {
    fetch("/viewbooking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: this.props.query.id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.length !== 0) {
          this.setState({
            zerobookings: false,
          });
        }
        this.setState({
          userbookings: result,
        });
      })
      .catch((err) => alert(err));
  }
  //below function will change the status of the booking to accepted
  bookingaccepted(id, room, dates, price) {
    fetch("/admin/confirmbooking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        room,
        dates,
        price,
        accepted: true,
        rejected: false,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        window.location.href = "/Admin";
      })
      .catch((err) => alert(err));
  }
  //below function will change the status of the booking to rejected
  bookingrejected(id, room, dates, price) {
    fetch("/admin/confirmbooking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        room,
        dates,
        price,
        accepted: false,
        rejected: true,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        window.location.href = "/Admin";
      })
      .catch((err) => alert(err));
  }
  render() {
    return (
      <div>
        <Link href="/Admin">
        <Button color="warning" style={{margin:"8px"}}>BACK</Button>
        </Link>{" "}
        {this.state.zerobookings ? (
          <h1>bookings not make by user</h1>
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="roomValues">ROOM</th>
                <th className="DateValues">DATE</th>
                <th>PRICE</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {/* map through data to display in the dom */}
              {this.state.userbookings.map((value, index) => {
                let id = value._id;
                let room = value.room;
                let dates = value.dates;
                let price = value.price;
                return (
                  <tr className="root" key={uuid.v4()}>
                    <td className="roomValues" key={uuid.v4()}>
                      {value.room}
                    </td>
                    <td className="DateValues" key={uuid.v4()}>
                      {value.dates}
                    </td>
                    <td key={uuid.v4()}>R{value.price}</td>
                    <td key={uuid.v4()}>
                      {value.pending ? (
                        <div className="text-warning" >pending...</div>
                      ) : value.accepted ? (
                        <div className="text-success">approved</div>
                      ) : (
                        <div className="text-danger">rejected</div>
                      )}
                    </td>
                    <td>
                      <Button
                        outline
                        color="success"
                        onClick={() =>
                          this.bookingaccepted(id, room, dates, price)
                        }
                        style={{marginRight:"8px"}}
                      >
                        Accept
                      </Button>
                      <Button
                        outline
                        color="danger"
                        id="reject"
                        onClick={() =>
                          this.bookingrejected(id, room, dates, price)
                        }
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <style jsx>
          {`
            @media (min-width: 340px) and (max-width: 470px) {
              .roomValues {
                display: none;
              }
            }
            @media (min-width: 1px) and (max-width: 339px) {
              .DateValues {
                display: none;
              }
              .roomValues {
                display: none;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default withRouter(userbookings);
