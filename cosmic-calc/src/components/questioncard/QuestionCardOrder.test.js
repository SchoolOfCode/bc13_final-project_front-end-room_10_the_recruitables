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
 
    expect(screen.getByTestId('order')).toHaveTextContent(50, 20, 10);
    
    });

    it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
      render(<QuestionCardOrder  {...mockedProps} />);
      const input = screen.getByRole('textbox')
      userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
      expect(mockedProps.checkAnswer).toHaveBeenCalled();
      expect(mockedProps.setAnswerInput).toHaveBeenCalled();

  });

  
  it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
      render(<QuestionCardOrder  {...mockedProps} />);
      const input = screen.getByRole('textbox')
      userEvent.type(input, `${mockedProps.answerInput}`)
      expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
      expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
  
});


it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
    render(<QuestionCardOrder{...mockedProps} />);
    const input = screen.getByRole('textbox')
    userEvent.type(input, `${mockedProps.answerInput}`)
    expect(input).toHaveValue(mockedProps.answerInput)
        
});

it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
  render(<QuestionCardOrder {...mockedProps} />);
  let input = screen.getByRole('textbox')
  userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
  input = screen.findByRole('textbox')
  expect(input.value).toBeUndefined()
  
});
  
})