import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { myTheme } from "../../../theme";
const useStyles = makeStyles((theme) => ({
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

const NavbarElement = ({ text }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="h5"
      className={classes.styleNavbarElement}
      id="navbarElement"
    >
      {text}
    </Typography>
  );
};

export default NavbarElement;
