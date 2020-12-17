import fetch from "isomorphic-unfetch";
import { useState } from "react";
import { withRouter } from "next/router";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Login from "../components/Login";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const Register = (props) => {
  //react hook used for state management
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  //route to login with google
  const googlelogin = () => {
    window.location.href = "/googlelogin";
  };
  //route to login with github
  const githublogin = () => {
    window.location.href = "/githublogin";
  };
  //post request to add user to the db
  const signUp = (e) => {
    e.preventDefault();
    fetch("/localSignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Username,
        password: Password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "savedUser") {
          alert("Registration successful, you are now able to login");
          window.location.href = "/";
        }
      })
      .catch((err) => alert(err));
  };

  //modal
  const { test } = props;
  const [modal, setModal] = useState(false);
  const Mtoggle = () => setModal(!modal);

  return (
    <div>
      <Form onSubmit={signUp}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="username"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
        </FormGroup>
        <Button
          style={{ width: "98%", margin: "5px", height: "50px" }}
          color="info"
        >
          REGISTER
        </Button>
      </Form>
      <GoogleLoginButton type="button" onClick={googlelogin} />
      <GithubLoginButton type="button" onClick={githublogin} />
      <ModalFooter>
        <h4 className="text-muted">Already have an account?</h4>
        <Button color="success" onClick={Mtoggle}>
          LOGIN
        </Button>
      </ModalFooter>
      {/* modal start */}
      <Modal isOpen={modal} toggle={Mtoggle} className={test}>
        <ModalHeader toggle={Mtoggle}>LOGIN</ModalHeader>
        <ModalBody>
          <Login />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(Register);
