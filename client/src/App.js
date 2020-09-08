import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import IntroductionPage from "./pages/introduction-page/introduction-page";

import { myTheme } from "../src/theme";
import { ThemeProvider } from "@material-ui/core";

const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Route exact path="/" component={IntroductionPage} />
        <Route path="/login" component={IntroductionPage} />
        <Route path="/home" component={IntroductionPage} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
