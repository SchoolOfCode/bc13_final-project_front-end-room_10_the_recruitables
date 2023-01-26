import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NextQButton from "./NextQButton";

describe("<NextQButton/>", () => {
    const mockedProps = { onClick: jest.fn() };
  
    it("click of button fires the provided 'onClick' callback prop", () => {
        render(<NextQButton onClick={mockedProps.onClick} />);
        const button = screen.getByRole("button");
        userEvent.click(button);
        expect(button).toBeInTheDocument();
        expect(mockedProps.onClick).toHaveBeenCalled();
      });

})