import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import QuestionCard from "./QuestionCard";

describe("<QuestionCard/>", () => {
  const mockedProps = {
    value1: 50,
    value2: 20,
    operation: "+",
    answerInput: 70,
    equals: "=",
    inputType: 'number',    
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };

  it("successfully renders the component, matches snapshot", () => {
    const { asFragment } = render(<QuestionCard {...mockedProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the provided 'value1', 'value2', 'operation', 'equals' prop content to the DOM" , () => {
    render(<QuestionCard  {...mockedProps} />);
    expect(screen.getByTestId('questionCard').textContent).toBe("50 + 20 =");
    
  });

  it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<QuestionCard {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  
  });

  
  it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
  render(<QuestionCard {...mockedProps} />);
  const input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}`)
  expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
  expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
  
});


it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
render(<QuestionCard {...mockedProps} />);
const input = screen.getByRole('spinbutton')
userEvent.type(input, `${mockedProps.answerInput}`)
expect(input).toHaveValue(mockedProps.answerInput)
        
});

it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
  render(<QuestionCard {...mockedProps} />);
  let input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
  input = screen.findByRole('spinbutton')
  expect(input.value).toBeUndefined()
  
});
      
})





   
