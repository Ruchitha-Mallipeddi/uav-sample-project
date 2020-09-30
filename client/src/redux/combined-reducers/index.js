import { combineReducers } from 'redux';
import locations from '../../locations-state/reducers/locationlistReducer';
export default combineReducers({
    locations: locations,
    
});