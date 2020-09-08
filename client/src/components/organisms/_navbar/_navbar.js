import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import NavbarElement from "../../atoms/_navbar-element/_navbar-element";
import * as Constants from "../../../constants";
import { Link } from "react-router-dom";
import { myTheme } from "../../../theme";

const useStyles = makeStyles((theme) => ({
  styleNavbar: {
    outline: "none",
    display: "flex",
    justifyContent: "center",
    height: "70px",
    backgroundColor: myTheme.palette.primary.main,
  },
  link: {
    textDecoration: "none",
  },
  button: {
    paddingLeft: "100px",
    paddingTop: "20px",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    
      <div className={classes.styleNavbar} id="header">
        <Link to="/login" className={classes.link}>
          <NavbarElement text={Constants.LOGIN}></NavbarElement>
        </Link>
      </div>
    
  );
};

export default Header;
