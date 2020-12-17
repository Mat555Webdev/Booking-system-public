import fetch from "isomorphic-unfetch";
import { useState } from "react";
import { withRouter } from "next/router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const Login = () => {
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
  //post request to log user in
  const login = (e) => {
    e.preventDefault();
    fetch("/localLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Username,
        password: Password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (
          result !== "username already taken" ||
          result !== "error adding user"
        ) {
          window.location.href = "/";
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div id="root">
      <div id="signup">
        <Form onSubmit={login}>
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
            id="localsignup"
          >
            Login
          </Button>
        </Form>
        <GoogleLoginButton id="google" type="button" onClick={googlelogin} />

        <GithubLoginButton id="github" type="button" onClick={githublogin} />

        <style jsx>
          {`
            #google {
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default withRouter(Login);
