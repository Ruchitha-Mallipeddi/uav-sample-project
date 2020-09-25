import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import { makeStyles } from "@material-ui/core";
import "./map.css";
import PublicIcon from "@material-ui/icons/Public";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const styles = {
  float: "left",
  position: "absolute",
  overflow: "hidden",
  width: "92%",
  height: "100%",
  marginLeft: "8%",
};

const useStyles = makeStyles((theme) => ({
  mapPage: {},
  icon: {
    right: "13px",
    bottom: "18%",
    position: "absolute",
  },
}));

const MapboxGLMap = ({showLatLng,showMarker}) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const classes = useStyles();
  const location = useLocation();
  const [flag, setFlag] = useState(true);
  const theToken = JSON.stringify(
    JSON.parse(localStorage.getItem("login-accesstoken")).token.access_token
  );
  //console.log({showMarker});
  const handleClick = () => {
    if (flag === false) {
      setFlag(true);
      map.setStyle("mapbox://styles/mapbox/streets-v11");
    } else {
      setFlag(false);
      map.setStyle("mapbox://styles/mapbox/satellite-v9");
    }
  };

  var loc = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 2,
    location.pathname.length
  );

  var lat = 0,
    lng = 0;

  const locations = useSelector((state) => {
    return {
      locations: state.locations.filter((data, i) => i == parseInt(loc) - 1),
    };
  });

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    if (!showMarker || locations) {
     
        locations.locations.map(
          (location, key) => ((lat = location.lat), (lng = location.lng))
        );
      

      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],

          zoom: 5,
        });
        {
        }
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
        if (showLatLng)       
         {
          map.on("mousemove", function (e) {
            document.getElementById("info").innerHTML = JSON.stringify(
              e.lngLat.wrap()
            );
          });
          map.on("click", function (e) {
            JSON.stringify(e.lngLat.wrap());

            var coordinates = [e.lngLat.lng, e.lngLat.lat];

            if (window.confirm("Add location?")) {
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
                    response.json().then((result) => {});
                  } else {
                  }
                })
                .catch((err) => {});
            }
          });
        }
        
        if (showMarker) {
          var marker = new mapboxgl.Marker({
            color: "red",
          })

            .setLngLat([lng, lat])

            .addTo(map);
        }
      };

      if (!map) initializeMap({ setMap, mapContainer });
    }
  }, [map, locations]);

  return (
    <div className={classes.mapPage}>
      {({showLatLng}) && (
        <div className="sidebarStyle" id="info"></div>
      )}
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div className={classes.icon}>
        <PublicIcon onClick={handleClick}></PublicIcon>
      </div>
    </div>
  );
};

export default MapboxGLMap;
