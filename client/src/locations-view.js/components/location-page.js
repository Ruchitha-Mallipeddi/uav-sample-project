import React, { useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Navbar from "../../reusable-components/navbar";
import { Card } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { myTheme } from "../../utils/theme";
import * as locationsListAction from "../../locations-state/actions/locationsListAction";
import { useDispatch, useSelector } from "react-redux";

import Map from "../../reusable-components/map";
import { useLocation, useHistory } from "react-router-dom";
const useStyles = makeStyles(() => ({
  card: {
    marginTop: myTheme.spacing(20/8),
    display: "flex",
    paddingBottom: myTheme.spacing(25/8),
  },
  name: {
    paddingLeft: "6%",
    paddingRight: "3%",
  },

  locations: {
    paddingLeft: "10%",
    width: "60%",
    float: "left",
    paddingTop: myTheme.spacing(50/8),
  },
  icons: {
    paddingLeft: "95%",
    paddingTop: myTheme.spacing(30/8),
    height: myTheme.spacing(20/8),
    "&:hover": {
      color: myTheme.palette.myColor.blackColor,
    },
  },
}));

const ListLocations = () => {
  const classes = useStyles();
  const history = useHistory();
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
  const handleAdd = () => {
    history.push("/locations/new");
  };
  const handleMarker = (id) => {
    history.push("/locations/:" + id);
  };

  var locationList;

  useEffect(() => {
    if (location.pathname === "/locations") {
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
                  result[i].lat,
                  result[i].lng
                );

                dispatch(action);
              }
            });
          }
        })
        .catch((err) => {});
    }
  }, [dispatch]);

  locationList = useSelector((state) => {
    return {
      locations: state.locations,
    };
  });

  let allLocations = null;

  if (flag === true && location.pathname == "/locations") {
    allLocations = null;
    allLocations = locationList.locations.map((location, key) => (
      <div onClick={() => handleMarker(location.id)}>
        <Card className={classes.card}>
          <Typography className={classes.name} variant="h6">
            {location.id}.
          </Typography>

          <Typography variant="h6">
            {" "}
            [lat: {location.lat},lng: {location.lng}]
          </Typography>
        </Card>
      </div>
    ));
  } else if (location.pathname == "/locations") {
    allLocations = null;
    allLocations = locationList.locations
      .slice()
      .reverse()
      .map((location, key) => (
        <div onClick={() => handleMarker(location.id)}>
          <Card className={classes.card}>
            <Typography className={classes.name} variant="h6">
              {location.id}.
            </Typography>
            <Typography variant="h6">
              {" "}
              [lat: {location.lat},lng: {location.lng}]
            </Typography>
          </Card>
        </div>
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
            <AddIcon onClick={handleAdd}></AddIcon>
          </div>
        </div>
      )}
      {(location.pathname === "/locations/new" 
        ) && (
        <div>
          <Map showLatLng={true} showMarker={false}></Map>
        </div>
      )}
{(location.pathname.match(/\/locations\/:(\d+)/)
       ) && (
        <div>
          <Map showLatLng={true} showMarker={true}></Map>
        </div>
      )}

    </div>
  );
};

export default ListLocations;
