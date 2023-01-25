import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginButton from "./Login";

describe("<LoginButton/>", () => {
  
  it("successfully renders the component, matches snapshot", () => {
    const { asFragment } = render(<LoginButton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("button text contains 'log in", () => {
    render(<LoginButton />);
    const button = screen.getByRole("button");   
    // expect(button).toHaveTextContent(mockedProps.text);
    expect(button).toHaveTextContent(/log in/i);
  });

 
});