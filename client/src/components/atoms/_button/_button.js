import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "25%",
    marginTop: '10px',
  },
}));

const CustomButton = ({ value, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.button} >
      <Button onClick={onClick} variant="contained" color="primary"  id="button">
        <Typography variant="button"> {value}</Typography>
      </Button>
    </div>
  );
};

export default CustomButton;