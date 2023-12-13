import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Signup from "./Signup";

describe("Signup Component", () => {
  it("Renders the Signup component with form elements", () => {
    const { getByLabelText, getByText } = render(<Signup />);
    const firstNameInput = getByLabelText("First Name");
    const lastNameInput = getByLabelText("Last Name");
    const nickNameInput = getByLabelText("Nickname (optional)");
    const emailAddressInput = getByLabelText("First Name");
    const passwordInput = getByLabelText("First Name");
    const profilePictureInput = getByLabelText("First Name");
    const createAccountButton = getByText("Create New Account");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(nickNameInput).toBeInTheDocument();
    expect(emailAddressInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(profilePictureInput).toBeInTheDocument();
    expect(createAccountButton).toBeInTheDocument();
  });
});
