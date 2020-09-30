import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapView from "../components/map-view";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));
describe("Map view component", () => {
  const store = createStore(() => ({ locations: [] }));

  test("Matches the snapshot", () => {
    const mapView = create(
      <Router>
        <Provider store={store}>
          <MapView />
        </Provider>
      </Router>
    );
    expect(mapView.toJSON()).toMatchSnapshot();
  });
  test(" nav bar element is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Provider store={store}>
          <MapView />
        </Provider>
      </Router>
    );
    expect(getByTestId("navbar")).toBeInTheDocument();
  });
  test(" map element is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Provider store={store}>
          <MapView />
        </Provider>
      </Router>
    );
    expect(getByTestId("map")).toBeInTheDocument();
  });
});
