import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import * as Constants from "../constants";
import { Link, Redirect } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { myTheme } from "../utils/theme";
import ListItem from "@material-ui/core/ListItem";
import { logout } from "../utils/index";
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    float: "left",
    width: "8%",

    backgroundColor: myTheme.palette.myColor.lightBlack,
  },
  link: {
    textDecoration: "none",
  },

  styleNavbarElement: {
    height: "20px",

    width: "100%",
    color: myTheme.palette.secondary.main,
    marginTop: "10%",
    paddingTop: "10%",
    paddingBottom: myTheme.spacing(15 / 8),

    paddingLeft: "10%",
    "&:hover": {
      backgroundColor: myTheme.palette.myColor.blackColor,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const logoutUser = () => {
    logout();
    return <Redirect to="/" />;
  };

  const handleLocations = () => {
    history.push("/locations");
  };

  return (
    <Drawer
      className={classes.styleNavbar}
      id="navbar"
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {(location.pathname === "/" || location.pathname === "/login") && (
        <ListItem className={classes.styleNavbarElement}>
          <Link to="/map" className={classes.link}>
            <Typography variant="h5" id="navbarElement">
              {Constants.MAP}
            </Typography>
          </Link>
        </ListItem>
      )}

      {(location.pathname === "/" || location.pathname === "/map") && (
        <ListItem className={classes.styleNavbarElement}>
          <Link to="/login" className={classes.link}>
            <Typography variant="h5" id="navbarElement">
              {Constants.LOGIN}
            </Typography>
          </Link>
        </ListItem>
      )}

      {(location.pathname.match(/\/locations\/:(\d+)/) ||
        location.pathname === "/locations" ||
        location.pathname === "/locations/new") && (
          <ListItem className={classes.styleNavbarElement}>
            <Link
              to="/locations"
              className={classes.link}
              onClick={handleLocations}
            >
              <Typography variant="h5" id="navbarElement">
                {Constants.LOCATIONS}
              </Typography>
            </Link>
          </ListItem>
        )}
      {(location.pathname.match(/\/locations\/:(\d+)/) ||
        location.pathname === "/locations" ||
        location.pathname === "/locations/new") && (
          <ListItem className={classes.styleNavbarElement}>
            <Link to="/locations/new" className={classes.link}>
              <Typography variant="h5" id="navbarElement">
                {Constants.MAP}
              </Typography>
            </Link>
          </ListItem>
        )}
      {(location.pathname.match(/\/locations\/:(\d+)/) ||
        location.pathname === "/locations" ||
        location.pathname === "/locations/new") && (
        <ListItem className={classes.styleNavbarElement}>
          <Link className={classes.link} onClick={logoutUser}>
            <Typography variant="h5" id="navbarElement">
              {Constants.LOGOUT}
            </Typography>
          </Link>
        </ListItem>
      )}
    </Drawer>
  );
};

export default Navbar;
