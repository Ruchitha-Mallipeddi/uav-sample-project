import React from "react";
import { create } from "react-test-renderer";
import {
  render,
  fireEvent,
  getByRole,
  getAllByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LocationView from "../components/location-page";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
var value = {
  "login-accesstoken": true,
  token: {
    access_token: "fake-access-token",
  },
};

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

describe("Location view component", () => {
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
  test(" map element is rendered", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/locations/:1"]}>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </MemoryRouter>
    );
    expect(getByTestId("map")).toBeInTheDocument();
  });

  test("on click functionality of location", () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function () {
            return { id: 2, lat: 56.2, lng: 56.3 };
          },
        });
      });

      return p;
    });
    const { getByTestId, getByText, getAllByTestId, container } = render(
      <MemoryRouter initialEntries={["/locations"]}>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </MemoryRouter>
    );
    expect(getAllByTestId("card")).toHaveLength(2);
    fireEvent.click(getAllByTestId("card")[0]);
    expect(getByTestId("map")).toBeInTheDocument();
  });
  test("on click functionality of icons", () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function () {
            return { id: 2, lat: 56.2, lng: 56.3 };
          },
        });
      });

      return p;
    });
    const { getByTestId, getByText, getAllByTestId, container } = render(
      <MemoryRouter initialEntries={["/locations"]}>
        <Provider store={store}>
          <LocationView />
        </Provider>
      </MemoryRouter>
    );

    expect(getAllByTestId("card")).toHaveLength(2);
    fireEvent.click(getByTestId("sortDsc"));
    expect(getAllByTestId("card")[1].innerHTML).toEqual(
      expect.stringContaining("[lat: 56.2,lng: 56.4]")
    );
    fireEvent.click(getByTestId("sortAsc"));
    expect(getAllByTestId("card")[1].innerHTML).toEqual(
      expect.stringContaining("[lat: 76.2,lng: 86.4]")
    );
    fireEvent.click(getByTestId("add"));
    expect(getByTestId("map")).toBeInTheDocument();
  });
});
