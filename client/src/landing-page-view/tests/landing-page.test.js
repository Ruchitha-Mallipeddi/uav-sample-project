import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LandingPage from "../components/landing-page";
import { BrowserRouter as Router } from "react-router-dom";

describe("Landing page component", () => {
  test("Matches the snapshot", () => {
    const landingPage = create(
      <Router>
        <LandingPage />
      </Router>
    );
    expect(landingPage.toJSON()).toMatchSnapshot();
  });
  test(" element is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <LandingPage />
      </Router>
    );
    expect(getByTestId("navbar")).toBeInTheDocument();
  });
});
