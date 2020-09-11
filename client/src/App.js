import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import LoginPage from "./login-view/components/login-page";
import LandingPage from "./landing-page-view/components/landing-page";
import MapPage from "./map-view/components/map-view";
import { myTheme } from "../src/theme";
import { ThemeProvider } from "@material-ui/core";
import HomePage from "../src/home-page-view/components/home-page";
import LocationsPage from "../src/locations-list-page-view/components/location-page"
import configureStore from '../src/redux/store/configureStore';
import AddLocationPage from "../src/add-location-page-view/components/add-location"
const store = configureStore();
const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
       <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/locations" component={LocationsPage} />
        <Route path="/locations/new" component={AddLocationPage} />
      </Router>
      
</Provider>
    </ThemeProvider>
  );
};

export default App;
