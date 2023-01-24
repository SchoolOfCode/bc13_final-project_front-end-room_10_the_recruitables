import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCardOrder from "./QuestionCardOrder";

describe("<QuestionCardOrder/>", () => {
    const mockedProps = {
      value1: 50,
      value2: 20,
      value3: 10,
      value4: 60,
      answerInput: '100',
      checkAnswer: jest.fn(),
      setAnswerInput: jest.fn()
    };



it("renders the provided 'value1', 'value2', 'value3', 'value4' prop content to the DOM", () => {
    render(<QuestionCardOrder  {...mockedProps} />);
    // const element = screen.getByTestId('order')
    // expect(element.textContent).toHaveValue(50)
    expect(screen.getByTestId('order')).toHaveTextContent(50, 20, 10);


    // const value1 = screen.getByText(/50/i);    
    // expect(element.textContent).toBeInTheDocument();    
    
    });

it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCardOrder {...mockedProps} />);
    const input = screen.getByRole('textbox')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  });


   it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
     render(<QuestionCardOrder {...mockedProps} />);
     const input = screen.getByRole('textbox')
     userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
     expect(mockedProps.checkAnswer).toHaveBeenCalled();
     expect(mockedProps.setAnswerInput).toHaveBeenCalled();
   });

    it("Typing in provided 'anwerInput' prop renders 'displayValue' to the input box" , () => {
    render(<QuestionCardOrder {...mockedProps} />);
    const input = screen.getByRole('textbox')
    userEvent.type(input, `${mockedProps.answerInput}`)
    expect(input).toHaveValue(mockedProps.answerInput)
            
    });
  
})