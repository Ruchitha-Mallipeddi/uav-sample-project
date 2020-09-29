import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LocationView from "../components/location-page";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
var value = {
  "login-accesstoken": true,
  token: {
    access_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOWI1YTM2My01YjFlLTQwYTMtOTY1Mi0yMjJiMDk4OWIxOGYiLCJleHAiOjE1OTEyMTkyMDEsImlhdCI6MTU5MTE4MzIwMX0.PfAhrE5ugDiyLoPRYJsAV9KHg727d_SiMp3OV34G-MY",
  },
};

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));
describe("Location view component", () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn().mockReturnValue(JSON.stringify(value)),
    },
  });
  const store = createStore(() => ({ locations: [] }));

  test("Matches the snapshot", () => {
    const mapView = create(
      <Router>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </Router>
    );
    expect(mapView.toJSON()).toMatchSnapshot();
  });
  test(" nav bar element is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </Router>
    );
    expect(getByTestId("navbar")).toBeInTheDocument();
  });

  test(" locations element is rendered", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/locations"]}>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </MemoryRouter>
    );
    expect(getByTestId("locations")).toBeInTheDocument();
  });
  test(" map element is rendered", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/locations/new"]}>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </MemoryRouter>
    );
    expect(getByTestId("map")).toBeInTheDocument();
  });
});
