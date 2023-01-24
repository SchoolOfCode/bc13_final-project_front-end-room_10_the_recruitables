import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCardColumn from "./QuestionCardColumn";

describe("<QuestionCardColumn/>", () => {
  const mockedProps = {
    value1: 50,
    value2: 20,
    answerInput: 100,
    operation: '+',
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };

    it("renders the provided 'value1', 'value2', 'value3, 'noOfQuestions' prop content to the DOM", () => {
     render(<QuestionCardColumn  {...mockedProps} />);
    
    const value1 = screen.getByText(/50/i);
    const value2 = screen.getByText(/20/i);
    const operation = screen.getByText('+');
    expect(value1).toBeInTheDocument();
    expect(value2).toBeInTheDocument();
    expect(operation).toBeInTheDocument();
    });

  
   it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
     render(<QuestionCardColumn {...mockedProps} />);
     const input = screen.getByRole('spinbutton')
     userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
     expect(mockedProps.checkAnswer).toHaveBeenCalled();
     expect(mockedProps.setAnswerInput).toHaveBeenCalled();
   });

    it("Typing in provided 'anwerInput' prop renders 'displayValue' to the input box" , () => {
    render(<QuestionCardColumn {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}`)
    // expect(screen.getByRole('spinbutton')).toHaveValue(mockedProps.answerInput); 
    expect(input).toHaveValue(mockedProps.answerInput)
            
    });
  
})