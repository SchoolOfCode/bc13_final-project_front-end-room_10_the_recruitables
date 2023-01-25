import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCardUnit from "./QuestionCardUnit";

describe("<QuestionCardUnit/>", () => {
  const mockedProps = {
    value1: 50,
    value2: 20,
    operation: "+",
    answerInput: 70,
    equals: "=",
    unit: "kg",
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };
  // {props.value1} {props.unit} {props.value2} {props.operation} {props.unit} {props.equals}
  it("renders the provided 'value1', 'value2', 'operation', 'equals', 'unit' prop content to the DOM", () => {
    render(<QuestionCardUnit  {...mockedProps} />);
    expect(screen.getByTestId('questionUnit').textContent).toBe("50 kg 20 + kg =");
  });

  it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardUnit {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  
  });

  
  it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
  render(<QuestionCardUnit {...mockedProps} />);
  const input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}`)
  expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
  expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
  
});


it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
render(<QuestionCardUnit {...mockedProps} />);
const input = screen.getByRole('spinbutton')
userEvent.type(input, `${mockedProps.answerInput}`)
expect(input).toHaveValue(mockedProps.answerInput)
        
});

it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
  render(<QuestionCardUnit {...mockedProps} />);
  let input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
  input = screen.findByRole('spinbutton')
  expect(input.value).toBeUndefined()
  
});
  
})