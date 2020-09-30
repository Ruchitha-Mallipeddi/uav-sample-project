import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(() => ({
      addTo: jest.fn(),
    })),
  })),
}));

describe("App component", () => {
  test("Matches the snapshot", () => {
    const app = create(
      <Router>
        <App></App>
      </Router>
    );
    expect(app.toJSON()).toMatchSnapshot();
  });
});
