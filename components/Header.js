import React, { useState, useEffect } from "react";

import { withRouter } from "next/router";

import Register from '../components/Register';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [admin, setAdmin] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //modal
  const { className } = props;

  const [modal, setModal] = useState(false);
  const Mtoggle = () => setModal(!modal);

  //check admin is logged in
  useEffect(() => {
    if (props.user === "admin") {
      setAdmin(true);
    }
  });

  //below code will log a user out
  const logout = () => {
    fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: null,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.href = "/";
      });
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        {admin ? (
          <NavbarBrand className="text-muted" href="/Admin">
            Dashboard
          </NavbarBrand>
        ) : (
          <NavbarBrand className="text-muted">Rest-Well</NavbarBrand>
        )}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="text-muted" href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              {/* data passed via query string so the user can view bookings */}
              <NavLink className="text-muted" href="/bookings">
                Bookings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="Navlogout"></NavLink>
            </NavItem>
            {props.loggedIn ? (
              <Button color="danger" onClick={logout}>
                Logout
              </Button>
            ) : (
              <div>
                <Button
                  color="success"
                  onClick={Mtoggle}
                >
                  REGISTER / LOGIN
                </Button>
                {/* modal start */}
                <Modal isOpen={modal} toggle={Mtoggle} className={className}>
                  <ModalHeader toggle={Mtoggle}>REGISTER</ModalHeader>
                  <ModalBody>
                    <Register/>
                  </ModalBody>
                </Modal>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(Header);
