import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCardThreeDig from "./QuestionCardThreeDig";

describe("<QuestionCard/>", () => {
  const mockedProps = {
    value1: 70,
    value2: 20,
    value3: 30,
    operation: "-",
    operation2: "+",
    answerInput: 70,
    equals: "=",
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };
  
  it("successfully renders the component, matches snapshot", () => {
    const { asFragment } = render(<QuestionCardThreeDig {...mockedProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

it("renders the provided 'value1', 'value2', 'value3', 'operation' and 'equals' prop content to the DOM", () => {
    render(<QuestionCardThreeDig  {...mockedProps} />);
  
    expect(screen.getByTestId('threeDig').textContent).toBe("70 - 20 + 30 =");  
 
    
    });
 

it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardThreeDig {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
});

it("Typing in provided 'anwerInput' prop renders 'displayValue' to the input box" , () => {
render(<QuestionCardThreeDig {...mockedProps} />);
const input = screen.getByRole('spinbutton')
userEvent.type(input, `${mockedProps.answerInput}`)
expect(screen.getByDisplayValue(70)).toBeInTheDocument()
        
});
   
  
})