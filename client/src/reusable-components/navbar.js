import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import * as Constants from "../constants";
import { Link } from "react-router-dom";
import { myTheme } from "../theme";

const useStyles = makeStyles((theme) => ({
  styleNavbar: {
    float: "left",
    outline: "none",
    display: "flex",

    width: "10%",
    height: "100vh",

    flexDirection: "column",
    alignItems: "initial",
    backgroundColor: myTheme.palette.myColor.lightBlack,
  },
  link: {
    textDecoration: "none",
  },

  styleNavbarElement: {
    height: "20px",

    width: "90%",
    color: myTheme.palette.secondary.main,
    marginTop: "10px",
    paddingTop: "7px",
    paddingBottom: "15px",

    paddingLeft: "10px",
    "&:hover": {
      backgroundColor: myTheme.palette.myColor.blackColor,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={classes.styleNavbar} id="navbar">
      {(location.pathname === "/" || location.pathname === "/login") && (
        <Link to="/map" className={classes.link}>
          <Typography
            variant="h5"
            className={classes.styleNavbarElement}
            id="navbarElement"
          >
            {Constants.MAP}
          </Typography>
        </Link>
      )}

      {(location.pathname === "/" || location.pathname === "/map") && (
        <Link to="/login" className={classes.link}>
          <Typography
            variant="h5"
            className={classes.styleNavbarElement}
            id="navbarElement"
          >
            {Constants.LOGIN}
          </Typography>
        </Link>
      )}

      {(location.pathname === "/locations" ||
        location.pathname === "/home" ||
        location.pathname === "/locations/new") && (
        <Link to="/locations" className={classes.link}>
          <Typography
            variant="h6"
            className={classes.styleNavbarElement}
            id="navbarElement"
          >
            {Constants.LOCATIONS}
          </Typography>
        </Link>
      )}
      {(location.pathname === "/locations" ||
        location.pathname === "/home" ||
        location.pathname === "/locations/new") && (
        <Link to="/locations/new" className={classes.link}>
          <Typography
            variant="h6"
            className={classes.styleNavbarElement}
            id="navbarElement"
          >
            {Constants.ADDLOCATION}
          </Typography>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
