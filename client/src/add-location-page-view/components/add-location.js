import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { makeStyles } from "@material-ui/core";
import "../components/map.css";
import PublicIcon from "@material-ui/icons/Public";

const styles = {
  float: "left",
  position: "absolute",
  overflow: "hidden",
  width: "90%",
  height: "100%",
};

const useStyles = makeStyles(() => ({
  mapPage: {
    overflow: "hidden",
  },
  icon: {
    right: "13px",
    bottom: "18%",
    position: "absolute",
  },
  lat: {
    position: "absolute",
  },
}));

const AddLocation = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const classes = useStyles();
  const [flag, setFlag] = useState(true);

  const theToken = JSON.stringify(
    JSON.parse(localStorage.getItem("login-accesstoken")).token.access_token
  );
  const handleClick = () => {
    if (flag === false) {
      setFlag(true);
      map.setStyle("mapbox://styles/mapbox/streets-v11");
    } else {
      setFlag(false);
      map.setStyle("mapbox://styles/mapbox/satellite-v9");
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [5, 34],
      zoom: 1.5,
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      setMap(map);
      map.resize();
      console.log(2);
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "bottom-right"
    );

    map.on("mousemove", function (e) {
      document.getElementById("info").innerHTML = JSON.stringify(
        e.lngLat.wrap()
      );
    });

    map.on("click", function (e) {
      JSON.stringify(e.lngLat.wrap());

      console.log(JSON.stringify(e.lngLat.wrap()));
      fetch(process.env.REACT_APP_MOCK_SERVER + "/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: theToken.substr(1, theToken.length - 2),
        },

        body: JSON.stringify(e.lngLat.wrap()),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((result) => {
              console.log("result:", result);
            });
          } else {
          }
        })
        .catch((err) => {});
    });
  }, []);

  return (
    <div className={classes.mapPage}>
      <div className="sidebarStyle" id="info"></div>

      <div ref={(el) => (mapContainer.current = el)} style={styles} />

      <div className={classes.icon}>
        <PublicIcon onClick={handleClick}></PublicIcon>
      </div>
    </div>
  );
};

export default AddLocation;
