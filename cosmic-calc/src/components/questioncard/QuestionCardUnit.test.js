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


    it("renders the provided 'value1', 'value2', 'operation', 'equals', 'unit' prop content to the DOM", () => {
     render(<QuestionCardUnit  {...mockedProps} />);
     const valuesProps = screen.getByText(/[50 kg + 20 kg =]/i);
     expect(valuesProps).toBeInTheDocument();
   });

   it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
     render(<QuestionCardUnit {...mockedProps} />);
     const input = screen.getByRole('spinbutton')
     userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
     expect(mockedProps.checkAnswer).toHaveBeenCalled();
     expect(mockedProps.setAnswerInput).toHaveBeenCalled();
   });

   it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardUnit {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
    expect(input).toHaveValue('')
  });
//between enter 


    it("Typing in provided 'anwerInput' prop renders 'displayValue' to the input box" , () => {
    render(<QuestionCardUnit {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}`)
    // expect(screen.getByRole('spinbutton')).toHaveValue(mockedProps.answerInput); 
    expect(input).toHaveValue(mockedProps.answerInput)
            
    });
  
})