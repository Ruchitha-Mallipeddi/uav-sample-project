import * as actionTypes from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_LOCATION:
      console.log("switch");
      return [...state, { id: action.id,name: action.name, lat: action.lat,lng: action.lng}];  

    default:
      return state;
  }
};