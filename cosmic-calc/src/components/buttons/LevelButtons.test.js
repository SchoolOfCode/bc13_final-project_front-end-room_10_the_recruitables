import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LevelButtons from "./LevelButtons";

describe("<LevelButtons/>", () => {
  const mockedProps = {
    ButtonNumber: 7,
    clickToGame: jest.fn(),
    text: "Go to level 7"
  };

  it("successfully renders the component, matches snapshot", () => {
    const { asFragment } = render(<LevelButtons {...mockedProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("click of button fires the provided 'clickToGame' callback prop", () => {
    render(<LevelButtons {...mockedProps} />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(mockedProps.clickToGame).toHaveBeenCalled();
  });

  it("button text contains provided 'text' prop content", () => {
    render(<LevelButtons {...mockedProps} />);
    const button = screen.getByRole("button");
   
    // expect(button).toHaveTextContent(mockedProps.text);
    expect(button).toHaveTextContent("Go to level 7");
  });

  it("button attribute contains provided 'buttonNumber' prop content", () => {
    render(<LevelButtons {...mockedProps} />);
    const button = screen.getByRole("button");
    // console.log(button.innerText);
    expect(button).toHaveAttribute("id", "levelButton-7");
  });
});