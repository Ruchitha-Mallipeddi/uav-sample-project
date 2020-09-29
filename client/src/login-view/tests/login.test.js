import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../components/login-page";
import { BrowserRouter as Router } from "react-router-dom";

import { act } from "react-test-renderer";

describe("Login page component", () => {
  test("Matches the snapshot", () => {
    const loginPage = create(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(loginPage.toJSON()).toMatchSnapshot();
  });
  test("  elements are rendered", () => {
    const { getByTestId } = render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(getByTestId("navbar")).toBeInTheDocument();
    expect(getByTestId("username")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("button")).toBeInTheDocument();
  });

  test("error message must be displayed for wrong inputs", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: false,
        });
      });

      return p;
    });
    const { getByTestId, getByRole, getByText } = render(
      <Router>
        <LoginPage />
      </Router>
    );
    fireEvent.change(getByTestId("username-value"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByTestId("password-value"), {
      target: { value: "zemoso" },
    });
    await fireEvent.click(getByRole("button"));
    expect(getByTestId("error")).toBeInTheDocument();
    expect(getByText("Invalid Credentials")).toBeInTheDocument();
  });

  test("error message must be displayed when fetch call fails", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        throw "error";
      });

      return p;
    });
    const { getByTestId, getByRole, getByText } = render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(getByTestId("username-value"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByTestId("password-value"), {
      target: { value: "zemoso" },
    });
    await act(() => fireEvent.click(getByRole("button")));
    expect(getByTestId("error")).toBeInTheDocument();
    expect(getByText("Network error")).toBeInTheDocument();
  });
});
