import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./login-view/components/login-page";
import LandingPage from "./landing-page-view/components/landing-page";
import { myTheme } from "../src/theme";
import { ThemeProvider } from "@material-ui/core";

const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
