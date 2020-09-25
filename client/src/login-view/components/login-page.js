import React from "react";
import { makeStyles, Typography, Button, Input } from "@material-ui/core";
import { myTheme } from "../../utils/theme";
import * as Constants from "../../constants";
import { useHistory } from "react-router-dom";
import Navbar from "../../reusable-components/navbar";

const useStyles = makeStyles(() => ({
  forms: {
    height: "300PX",
    width: "250px",
    backgroundColor: myTheme.palette.myColor.ashColor,
    float: "left",
    margin: myTheme.spacing("auto"),
    paddingTop: myTheme.spacing(50/8),
    marginTop: myTheme.spacing(100/8),
    paddingLeft: myTheme.spacing(50/8),
    marginLeft: '40%',
  },
  input: {
    paddingBottom: myTheme.spacing(10/8),
    color: myTheme.palette.myColor.blackColor,
  },
  heading: {
    paddingTop: myTheme.spacing(50/8),
  },
  error: {
    paddingLeft: myTheme.spacing(40/8),
    color: myTheme.palette.myColor.redColor,
  },
  button: {
    marginLeft: "25%",
    marginTop: myTheme.spacing(10/8),
  },
  styleInputFields: {
    marginRight: myTheme.spacing(20/8),
  },
}));

const LoginPage = () => {
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
            localStorage.setItem(
              "login-accesstoken",
              JSON.stringify({
                token: result,
              })
            );
            history.push("/locations/new");
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
      <Navbar></Navbar>
      <form className={classes.forms}>
        <div className={classes.input}>
          <Typography
            variant="h5"
            style={{
              color: myTheme.palette.myColor.blackColor,
              paddingBottom: "20px",
              paddingLeft: "27%",
            }}
          >
            {Constants.LOGIN}
          </Typography>

          <div id="input">
            <Typography variant="h6">{Constants.USERNAME_LABEL}</Typography>
            <Input onChange={handleChangeInUsername} />
          </div>

          <div id="input">
            <Typography variant="h6">{Constants.PASSWORD_LABEL}</Typography>
            <Input onChange={handleChangeInPassword} />
          </div>
        </div>

        <Typography className={classes.error} id="error">
          {authenticationError !== "" && authenticationError}
        </Typography>
        <div className={classes.button}>
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            id="button"
          >
            <Typography variant="button"> {Constants.SUBMIT}</Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
