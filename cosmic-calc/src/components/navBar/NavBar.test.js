import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavBar from "./NavBar";

describe("<NavBar/>", () => {
  const mockedProps = {
    ButtonNumber: 7,
    clickToGame: jest.fn(),
    text: "Go to level 7"
  };

})