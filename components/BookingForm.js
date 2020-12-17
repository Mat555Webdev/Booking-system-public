import React, {useState } from "react";
import { withRouter } from "next/router";

import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

function BookingForm(props) {
  //local state
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState(props.session.id);
  const [room, setRoom] = useState(props.room);

  //code below will get the amount of days the user is going to stay
  const GetDays = () => {
    var dropdt = new Date(document.getElementById("end_date").value);
    var pickdt = new Date(document.getElementById("start_date").value);
    return parseInt((dropdt - pickdt) / (24 * 3600 * 1000));
  };
  //below function will determine how much the user has to pay depeneding
  //on how long they're going to stay.
  const cal = () => {
    let exactdays = GetDays();
    
    let priceperday = parseInt(props.price);
    let actualprice = exactdays * priceperday;
    let endDate = document.getElementById("end_date").value;
    
    let startDate = document.getElementById("start_date").value;
    console.log("start "+startDate);
    if (endDate) {
      if (endDate == "") {
        document.getElementById("price").value = "";
        this.setState({
          price: "",
        });
      } else {
        document.getElementById("price").value = "R" + actualprice;
        setPrice(actualprice);
        setDate(`${startDate} - ${endDate}`);
      }
    }
  };

  //code below will add a booking to the db
  const makebooking = (e) => {
    e.preventDefault();
    fetch("/makebooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: userId,
        room,
        dates: date,
        price
      }),
    })
      .then((res) => res.text())
      .then((result) => {
        if (result !== "error while creating the booking") {
          alert(
            "Please check your bookings regularly to see if the owner has confirmed"
          );
          window.location.href = "/";
        } else {
          alert(result);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div id="root">
      <Form onSubmit={makebooking}>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            CLIENT
          </Label>
          <Col sm={10}>
            <Input
              readOnly
              type="email"
              value={props.session.username}
              name="email"
              id="exampleEmail"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>ROOM</Label>
          <Col sm={10}>
            <Input readOnly value={props.room} name="room" id="room" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>START</Label>
          <Col sm={10}>
            <Input
              type="date"
              id="start_date"
              onChange={cal}
              name="startDate"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>END</Label>
          <Col sm={10}>
            <Input
              type="date"
              id="end_date"
              onChange={cal}
              name="endDate"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>PRICE</Label>
          <Col sm={10}>
            <Input readOnly type="text" id="price" name="numdays" />
          </Col>
        </FormGroup>
        <Button color="success">Confirm</Button>{" "}
        <Button color="warning" onClick={props.toggle}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(BookingForm);
