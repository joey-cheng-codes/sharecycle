import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import Login from "./Login";

describe("Login Component", () => {
  it("Renders the Login component with form elements", () => {
    const setLoggedIn = jest.fn();
    const { getByLabelText, getByText } = render(<Login setLoggedIn={setLoggedIn} />);
    const emailInput = getByLabelText("Email address");
    const passwordInput = getByLabelText("Password");
    const signInButton = getByText("Sign in");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });
});
