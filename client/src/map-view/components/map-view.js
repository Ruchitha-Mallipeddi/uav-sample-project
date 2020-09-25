import React from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import Navbar from "../../reusable-components/navbar";

import "../components/map.css";

import Map from "../../reusable-components/map";

const MapboxGLMap = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Map></Map>
    </div>
  );
};

export default MapboxGLMap;
