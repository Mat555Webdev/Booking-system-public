import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import BookingForm from "./BookingForm";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

function Rooms(props) {
  //modal
  const { className } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //local state
  const [room, setRoom] = useState("");
  const [price, setPrice] = useState("");

  const giveDetailsToForm = (e) => {
    let stringValue =
      e.target.parentElement.children[1].children[0].textContent;
    let exactprice = stringValue.match(/(\d+)/);
    setPrice(exactprice[0]);
    setRoom(e.target.parentElement.children[0].textContent);
    setModal(!modal);
  };

  useEffect(() => {
    //loop throught each button and add an event listener
    //in order to retrieve the name and price from the
    //the DOM
    let btn = document.getElementsByClassName("bookingbtn");
    for (let i = 0; i < btn.length; i++) {
      btn.item(i).addEventListener("click", () => {
        //retrieve room selected details
        let str = btn.item(i).parentElement.children[1].children[0].textContent;

        let exactprice = str.match(/(\d+)/);
        setPrice(exactprice[0]);
        setRoom(btn.item(i).parentElement.children[0].textContent);
        setPrice(exactprice[0]);
      });
    }
  });

  //pop over
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <div>
      <Container>
        <Row>
          <Col style={{ paddingBottom: "18px", paddingTop: "18px" }}>
            <h3>Your next holiday made simple.</h3>
          </Col>
        </Row>
        <Row>
          <Col
            style={{ paddingBottom: "18px" }}
            className="firststColInRow"
            xs="12"
            sm="12"
            md="6"
            large="6"
            xl="6"
          >
            <Card>
              <CardImg top src="/img/1.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Johannesburg, Sandton</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R1050 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, self-catering, private bathroom, DSTV, 2 guests
                </p>
                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus1" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus1"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}

                {/* modal start */}
                <Modal isOpen={modal} toggle={toggle} className={className}>
                  <ModalHeader toggle={toggle}>Confirm booking</ModalHeader>
                  <ModalBody>
                    <BookingForm
                      toggle={toggle}
                      session={props.session}
                      room={room}
                      price={price}
                    />
                  </ModalBody>
                </Modal>
                {/* modal end */}
              </CardBody>
            </Card>
          </Col>
          <br />
          <Col xs="12" sm="12" md="6" large="6" xl="6">
            <Card>
              <CardImg top src="/img/2.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Johannesburg, Florida</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R650 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, private pool, private bathroom, DSTV, 2 guests
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus2" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus2"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col
            style={{ paddingBottom: "18px" }}
            xs="12"
            sm="12"
            md="6"
            large="6"
            xl="6"
          >
            <Card>
              <CardImg top width="100%" src="/img/3.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Johannesburg, Sandton(2)</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R1250 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, private bathroom, DSTV, 2 guests
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus3" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus3"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6" large="6" xl="6">
            <Card>
              <CardImg top width="100%" src="/img/4.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Kimberley, Royaldene</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R500 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, private bathroom, DSTV, 2 guests
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus4" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus4"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col
            style={{ paddingBottom: "18px" }}
            xs="12"
            sm="12"
            md="6"
            large="6"
            xl="6"
          >
            <Card>
              <CardImg top width="100%" src="/img/5.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Johannesburg, Sandton (3)</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R1150 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, private bathroom, DSTV, 2 guests
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus5" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus5"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6" large="6" xl="6">
            <Card>
              <CardImg top width="100%" src="/img/6.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Johannesburg, Midrand</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R785 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, private pool, private bathroom, DSTV, 2 guests
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus6" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus6"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col
            style={{ paddingBottom: "18px" }}
            xs="12"
            sm="12"
            md="6"
            large="6"
            xl="6"
          >
            <Card>
              <CardImg top width="100%" src="/img/7.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Pretoria, Centurion</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R995 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, 2 bathrooms, DSTV, 2 guests.
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus7" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus7"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6" large="6" xl="6">
            <Card>
              <CardImg top width="100%" src="/img/4.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <h3 className="text-muted">Bloemfontein, Willows</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5 className="text-muted">R665 per night</h5>
                </CardSubtitle>

                <p className="text-muted" style={{ fontSize: "110%" }}>
                  Free Wifi, private bathroom, DSTV, 2 guests.
                </p>

                {props.loggedIn ? (
                  <Button
                    className="bookingbtn"
                    color="primary"
                    onClick={toggle}
                  >
                    Book Now
                  </Button>
                ) : (
                  <div>
                    <Button id="PopoverFocus8" type="button" color="primary">
                      Book Now
                    </Button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target="PopoverFocus8"
                    >
                      <PopoverHeader>Unable to book</PopoverHeader>
                      <PopoverBody>
                        Please register before attempting to make a booking.
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
      </Container>
      <div id="footer">
        <h5 style={{ textAlign: "center", paddingTop: "15px" }}>
          Image sources
        </h5>
        <a target="_blank" href="https://www.pexels.com/">
          <p style={{ textAlign: "center" }}>www.pexels.com</p>
        </a>
        <p style={{ textAlign: "center" }}>
          SA Department of Health's website for COVID-19 updates:{" "}
          <a target="_blank" href="https://www.sacoronavirus.co.za">
            www.sacoronavirus.co.za
          </a>
        </p>
      </div>
      <style jsx>
        {`
          @media (min-width: 1px) and (max-width: 770px) {
            .firststColInRow {
              padding-bottom: 15px;
            }
          }
          #footer {
            background-color: whitesmoke;
            width: "100%";
            height: 30vh;
          }
        `}
      </style>
    </div>
  );
}

export default withRouter(Rooms);
