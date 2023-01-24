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


it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardCompare {...mockedProps} />);
    const input = screen.getByRole('textbox')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  });

    it("renders the provided 'value1' prop content to the DOM", () => {
     render(<QuestionCardCompare  {...mockedProps} />);
    
    const value1 = screen.getByText(/50/i);    
    expect(value1).toBeInTheDocument();    
   
   });

   it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
     render(<QuestionCardCompare {...mockedProps} />);
     const input = screen.getByRole('textbox')
     userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
     expect(mockedProps.checkAnswer).toHaveBeenCalled();
     expect(mockedProps.setAnswerInput).toHaveBeenCalled();
   });

    it("Typing in provided 'anwerInput' prop renders 'displayValue' to the input box" , () => {
    render(<QuestionCardCompare {...mockedProps} />);
    const input = screen.getByRole('textbox')
    userEvent.type(input, `${mockedProps.answerInput}`)
    expect(input).toHaveValue(mockedProps.answerInput)
            
    });
  
})