import { createStore } from "redux";
import rootReducer from "../combined-reducers/index";
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}