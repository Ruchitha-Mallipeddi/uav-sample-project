import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../navbar";

describe("navbar component", () => {
  test("Matches the snapshot", () => {
    const mapView = create(
      <Router>
        <Navbar />
      </Router>
    );
    expect(mapView.toJSON()).toMatchSnapshot();
  });
  test(" nav bar element is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(getByTestId("navbar")).toBeInTheDocument();
  });

  test("correct elements are present for /", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    expect(getByText("LOGIN")).toBeInTheDocument();
    expect(getByText("MAP")).toBeInTheDocument();
  });
  test("correct elements are present for /login", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(getByText("MAP")).toBeInTheDocument();
  });
  test("correct elements are present for /map", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/map"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(getByText("LOGIN")).toBeInTheDocument();
  });
  test("correct elements are present for /map", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/locations"]}>
        <Navbar />
      </MemoryRouter>
    );

    expect(getByText("LOGOUT")).toBeInTheDocument();
    expect(getByText("LOCATIONS")).toBeInTheDocument();
    expect(getByText("MAP")).toBeInTheDocument();
  });
  test("checking logout link redirection", () => {
    const { getByTestId, getByText, container } = render(
      <MemoryRouter initialEntries={["/locations"]}>
        <Navbar />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("logoutLink"));
  });
});
