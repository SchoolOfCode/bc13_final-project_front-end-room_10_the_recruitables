import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCardFraction from "./QuestionCardFraction";

describe("<QuestionCardFraction/>", () => {
  const mockedProps = {
    value1: 50,
    value2: 20,
    value3: 10,
    answerInput: 100,
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };


it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardFraction {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  });

    it("renders the provided 'value1', 'value2', 'value3, 'noOfQuestions' prop content to the DOM", () => {
     render(<QuestionCardFraction  {...mockedProps} />);
    
    const value1 = screen.getByText(/50/i);
    const value2 = screen.getByText(/20/i);
    const value3 = screen.getByText(/10/i);
    expect(value1).toBeInTheDocument();
    expect(value2).toBeInTheDocument();
    expect(value3).toBeInTheDocument();
   });

   it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardFraction {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  
  });

  
  it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
  render(<QuestionCardFraction {...mockedProps} />);
  const input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}`)
  expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
  expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
  
});


it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
render(<QuestionCardFraction {...mockedProps} />);
const input = screen.getByRole('spinbutton')
userEvent.type(input, `${mockedProps.answerInput}`)
expect(input).toHaveValue(mockedProps.answerInput)
        
});

it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
  render(<QuestionCardFraction {...mockedProps} />);
  let input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
  input = screen.findByRole('spinbutton')
  expect(input.value).toBeUndefined()
  
});
  
})