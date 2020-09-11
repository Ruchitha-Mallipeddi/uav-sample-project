import React, { useEffect } from "react";
import { makeStyles, Typography} from "@material-ui/core";

import Navbar from "../../reusable-components/navbar";
import Card from "@material-ui/core/Card";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import * as locationsListAction from "../../locations-list-page-state/actions/locationsListAction";
import { useDispatch, useSelector } from "react-redux";
import AddLocation from "../../add-location-page-view/components/add-location";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "20px",
    display: "flex",
   
    paddingBottom: "25px",
  },
  name: {
    paddingLeft: "6%",
    paddingRight: "3%",
  },

  locations: {
    paddingLeft: "10%",
    width: "60%",
    float: "left",
    paddingTop: "50px",
  },
  icons: {
    paddingLeft: "95%",
    paddingTop: "30px",
    height: "20px",
    "&:hover": {
      color: "#000",
    },
  },
}));

const ListLocations = () => {
  const classes = useStyles();

  const [flag, setFlag] = React.useState(true);
  const dispatch = useDispatch();
  const theToken = JSON.stringify(
    JSON.parse(localStorage.getItem("login-accesstoken")).token.access_token
  );
  const location = useLocation();
  const handleAsc = () => {
    setFlag(true);
  };
  const handleDsc = () => {
    setFlag(false);
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_MOCK_SERVER + "/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: theToken.substr(1, theToken.length - 2),
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            for (var i = 0; i < result.length; i++) {
              const action = locationsListAction.addLocation(
                result[i].id,
                "a",
                result[i].lat,
                result[i].lng
              );
             
              dispatch(action);
            }
          });
        }
      })
      .catch((err) => {});
  }, []);

  const locationList = useSelector((state) => {
    return {
      locations: state.locations,
    };
  });

  let allLocations = null;

  if (flag === true) {
    allLocations = locationList.locations.map((location, key) => (
      <Card className={classes.card}>
        <Typography className={classes.name} variant="h6">
          {location.id}.
        </Typography>
        {/* <div className={classes.name}>
          {" "}
          <Typography variant="h6">{location.name} </Typography>{" "}
        </div> */}
        <Typography variant="h6">
          {" "}
          [lat: {location.lat},lng: {location.lng}]
        </Typography>
      </Card>
    ));
  } else {
    allLocations = locationList.locations
      .slice()
      .reverse()
      .map((location, key) => (
        <Card className={classes.card}>
          <Typography className={classes.name} variant="h6">
            {location.id}.
          </Typography>
          {/* <div className={classes.name}>
        {" "}
        <Typography variant="h6">b </Typography>{" "}
      </div> */}
          <Typography variant="h6">
            {" "}
            [lat: {location.lat},lng: {location.lng}]
          </Typography>
        </Card>
      ));
  }

  return (
    <div>
      <Navbar></Navbar>
      {location.pathname === "/locations" && (
        <div>
          <div className={classes.locations}>{allLocations}</div>
          <div className={classes.icons}>
            <ArrowDownwardIcon onClick={handleAsc}></ArrowDownwardIcon>
            <ArrowUpwardIcon onClick={handleDsc}></ArrowUpwardIcon>
          </div>
        </div>
      )}
      {location.pathname === "/locations/new" && (
        <div>
          <AddLocation></AddLocation>
        </div>
      )}
    </div>
  );
};

export default ListLocations;
