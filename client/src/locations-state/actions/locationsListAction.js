import * as actionTypes from "./actionTypes";

export const addLocation = (id, lat,lng) => {
  return {
    type: actionTypes.ADD_NEW_LOCATION,
  lat: lat,
  lng: lng,
  id: id,
  };
};
