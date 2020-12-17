import React from "react";

//dependencies
import uuid from "uuid";

import { Table, Button } from "reactstrap";

export default function ViewBooking(props) {
  //below function will make a request to the backend to delete
  //the booking chosen by the user.
  const deletbooking = (id) => {
    fetch("/deletebooking", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.text())
      .then((result) => {
        alert(result);
        window.location.reload();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      {props.loggedIn ? (
        <div>
          {props.zerobookings ? (
            <h1>No bookings available</h1>
          ) : (
            <Table bordered>
              <thead>
                <tr>
                  <th className="roomValues">ROOM</th>
                  <th className="DateValues" >DATE</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {/* map through the booking to display it for the user */}
                {props.bookings.map((value, index) => {
                  return (
                    <tr className="root" key={uuid.v4()}>
                      <td className="roomValues" key={uuid.v4()}>
                        {value.room}
                      </td>
                      <td className="DateValues" key={uuid.v4()}>{value.dates}</td>
                      <td key={uuid.v4()}>R{value.price}</td>
                      <td key={uuid.v4()}>
                        {value.pending ? (
                          <div className="text-warning">
                            pending...
                          </div>
                        ) : value.accepted ? (
                          <div className="text-success">
                            approved
                          </div>
                        ) : (
                          <div className="text-danger">
                            rejected
                          </div>
                        )}
                      </td>
                      <td>
                        <Button
                          outline
                          color="danger"
                          onClick={() => deletbooking(value._id)}
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
      <style jsx>
        {`
          @media (min-width: 340px) and (max-width: 470px) {
            .roomValues {
              display:none
            }
          }
          @media (min-width: 1px) and (max-width: 339px) {
            .DateValues {
              display:none
            }
            .roomValues {
              display:none
            }
          }
        `}
      </style>
    </div>
  );
}
