import * as actionTypes from "./actionTypes";

export const addLocation = (id,name, lat,lng) => {
  return {
    type: actionTypes.ADD_NEW_LOCATION,
    name: name,
  lat: lat,
  lng: lng,
  id: id,
  };
};
