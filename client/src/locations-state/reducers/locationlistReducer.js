import * as actionTypes from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_LOCATION:
      if ((action.id &&  action.lat && action.lng)) {
        return [
          ...state,
          {
            id: action.id,            
            lat: action.lat,
            lng: action.lng,
          },
        ];
      } else {
        return state;
      }

    default:
      return state;
  }
};
