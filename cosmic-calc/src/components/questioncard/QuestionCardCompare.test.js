import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCardCompare from "./QuestionCardCompare";

describe("<QuestionCardFraction/>", () => {
  const mockedProps = {
    value1: 50,
    answerInput: '>',
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };


  it("renders the provided 'value1' prop content to the DOM", () => {
      render(<QuestionCardCompare  {...mockedProps} />);
    
      const value1 = screen.getByText(/50/i);    
      expect(value1).toBeInTheDocument();    
    
  });

  it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
      render(<QuestionCardCompare  {...mockedProps} />);
      const input = screen.getByRole('textbox')
      userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
      expect(mockedProps.checkAnswer).toHaveBeenCalled();
      expect(mockedProps.setAnswerInput).toHaveBeenCalled();

  });

  
  it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
      render(<QuestionCardCompare  {...mockedProps} />);
      const input = screen.getByRole('textbox')
      userEvent.type(input, `${mockedProps.answerInput}`)
      expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
      expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
  
});


it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
    render(<QuestionCardCompare {...mockedProps} />);
    const input = screen.getByRole('textbox')
    userEvent.type(input, `${mockedProps.answerInput}`)
    expect(input).toHaveValue(mockedProps.answerInput)
        
});

it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
  render(<QuestionCardCompare {...mockedProps} />);
  let input = screen.getByRole('textbox')
  userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
  input = screen.findByRole('textbox')
  expect(input.value).toBeUndefined()
  
});
  
})