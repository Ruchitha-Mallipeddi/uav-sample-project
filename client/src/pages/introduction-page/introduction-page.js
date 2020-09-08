import React from "react";
import NavbarTemplate from "../../components/templates/_navbar-template/_navbar-template";

import Navbar from "../../components/organisms/_navbar/_navbar";
import Introduction from "../../components/organisms/_introduction-main-content/_introduction-main-ccontent";

const IntroductionPage = () => {
  return (
    <div id="IntroductionPage">
      <NavbarTemplate
        header={<Navbar></Navbar>}
        mainContent={<Introduction></Introduction>}
      ></NavbarTemplate>
    </div>
  );
};

export default IntroductionPage;
