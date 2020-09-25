import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./login-view/components/login-page";
import LandingPage from "./landing-page-view/components/landing-page";
import MapPage from "./map-view/components/map-view";
import { myTheme } from "./utils/theme";
import { ThemeProvider } from "@material-ui/core";
import HomePage from "../src/home-page-view/components/home-page";

import LocationsPage from "./locations-view.js/components/location-page";
import configureStore from "../src/redux/store/configureStore";

import PrivateRoute from "./reusable-components/PrivateRoute";
const store = configureStore();
const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/map" component={MapPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/locations" component={LocationsPage} />
          <PrivateRoute path="/locations/new" component={LocationsPage} />
          <PrivateRoute
            path="/locations/:(\d+)"
            component={LocationsPage}
          />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
