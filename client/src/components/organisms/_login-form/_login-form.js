import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { myTheme } from "../../../theme";
import * as Constants from "../../../constants";
import Input from "../../molecules/_input/_input";
import { useHistory } from "react-router-dom";
import Button from "../../atoms/_button/_button";

const useStyles = makeStyles((theme) => ({
  forms: {
    height: "300PX",
    width: "250px",
    backgroundColor: myTheme.palette.myColor.ashColor,

    margin: "auto",
    paddingTop: "30px",
    marginTop: "30px",
    paddingLeft: "50px",
  },
  input: {
    paddingBottom: "10px",
  },
  heading: {
    paddingTop: "50px",
  },
  error: {
    paddingLeft: "40px",
    color: myTheme.palette.myColor.redColor,
  },
}));

const LoginForm = ({ handleSignupClick }) => {
  const classes = useStyles();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const [authenticationError, setAuthenticationError] = React.useState("");

  const handleChangeInUsername = (event) => {
    event.preventDefault();

    const username = event.target.value;
    setUserName(username);

    setAuthenticationError("");
  };
  const handleChangeInPassword = (event) => {
    event.preventDefault();

    const password = event.target.value;
    setPassword(password);
    setAuthenticationError("");
  };

  const handleClick = (event) => {
    event.preventDefault();
    const loginObj = {
      username: username,
      password: password,
    };

    fetch(process.env.REACT_APP_MOCK_SERVER + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            console.log("result:", result);

            localStorage.setItem(
              "login-accesstoken",
              JSON.stringify({
                token: result,
              })
            );
            history.push("/home");
          });
        } else {
          setAuthenticationError(Constants.INVALID_CREDENTIALS);
        }
      })
      .catch((err) => {
        setAuthenticationError(Constants.NETWORK_ERROR);
      });
  };

  return (
    <div>
      <form className={classes.forms}>
        <div className={classes.input}>
          <Input
            label={Constants.USERNAME_LABEL}
            value=""
            onChange={handleChangeInUsername}
          ></Input>
        </div>

        <div className={classes.input}>
          <Input
            label={Constants.PASSWORD_LABEL}
            value=""
            onChange={handleChangeInPassword}
          ></Input>
        </div>
        <Typography className={classes.error} id="error">
          {authenticationError !== "" && authenticationError}
        </Typography>

        <Button value={Constants.SUBMIT} onClick={handleClick}></Button>
      </form>
    </div>
  );
};

export default LoginForm;
