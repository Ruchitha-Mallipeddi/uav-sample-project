import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Map from "../map";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

var value = {
  "login-accesstoken": true,
  token: {
    access_token: "fake-access-token",
  },
};

const mockOnClick = jest.fn().mockName("mockClick");
jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: mockOnClick,

    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(() => ({
      addTo: jest.fn(),
    })),
  })),
}));

describe("Map component", () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn().mockReturnValue(JSON.stringify(value)),
    },
  });
  const store = createStore(() => ({
    locations: [
      { id: 1, lat: 56.2, lng: 56.4 },
      { id: 2, lat: 76.2, lng: 86.4 },
    ],
  }));
  test("Matches the snapshot", () => {
    const map = create(
      <Router>
        <Provider store={store}>
          <Map />
        </Provider>
      </Router>
    );
    expect(map.toJSON()).toMatchSnapshot();
  });
  test(" element is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Provider store={store}>
          <Map />
        </Provider>
      </Router>
    );
    expect(getByTestId("map")).toBeInTheDocument();
  });
  test(" globe icon is rendered", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Provider store={store}>
          <Map />
        </Provider>
      </Router>
    );
    expect(getByTestId("satellite")).toBeInTheDocument();
    fireEvent.click(getByTestId("satellite"));
  });
  test(" latitude and longitude values are shown", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Provider store={store}>
          <Map showLatLng={true} />
        </Provider>
      </Router>
    );
    expect(getByTestId("latlng")).toBeInTheDocument();
  });
});
