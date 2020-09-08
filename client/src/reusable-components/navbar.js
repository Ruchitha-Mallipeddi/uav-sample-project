import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import * as Constants from "../constants";
import { Link } from "react-router-dom";
import { myTheme } from "../theme";

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

  styleNavbarElement: {
    height: "20px",
    width: "70px",
    marginRight: "30px",
    marginTop: "20px",
    "&:hover": {
      color: myTheme.palette.myColor.blackColor,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={classes.styleNavbar} id="navbar">
      {location.pathname === "/" && (
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
    </div>
  );
};

export default Navbar;
