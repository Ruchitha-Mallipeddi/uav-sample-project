import React from "react";

import { useLocation } from "react-router-dom";

import Login from "../_login-form/_login-form";

const IntroductionMainContent = () => {
  const location = useLocation();

  return <div>{location.pathname === "/login" && <Login />}</div>;
};

export default IntroductionMainContent;
