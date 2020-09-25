import { createStore ,compose} from "redux";
import rootReducer from "../combined-reducers/index";
export default function configureStore(initialState) {
  return createStore(rootReducer , initialState,process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION__({})
  : compose);
}
