import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Navbar from "../../reusable-components/navbar";
import { makeStyles } from "@material-ui/core";
import "../components/map.css";
import PublicIcon from "@material-ui/icons/Public";
import zIndex from "@material-ui/core/styles/zIndex";
const styles = {
  float: "left",

  position: "absolute",
  overflow: "hidden",
  width: "90%",
  height: "100%",
  marginLeft: "10%",
};

const useStyles = makeStyles((theme) => ({
  mapPage: {
    overflow: "hidden",
  },
  icon: {
    right: "13px",
    bottom: "18%",
    position: "absolute",
  },
}));

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const classes = useStyles();
  const [flag, setFlag] = useState(true);
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
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [0, 0],
        zoom: 5,
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
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div className={classes.mapPage}>
      <Navbar></Navbar>

      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div className={classes.icon}>
        <PublicIcon onClick={handleClick}></PublicIcon>
      </div>
    </div>
  );
};

export default MapboxGLMap;
