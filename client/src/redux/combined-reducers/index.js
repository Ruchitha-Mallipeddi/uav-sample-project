import { combineReducers } from 'redux';
import locations from '../../locations-list-page-state/reducers/locationlistReducer';

export default combineReducers({
    locations: locations
});