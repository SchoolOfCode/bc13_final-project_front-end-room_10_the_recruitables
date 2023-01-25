import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import PicQuestionCard from "./picQuestionCard";

describe("<PicQuestionCard/>", () => {
  const mockedProps = {
    value1: 50,
    value2: 2,
    operation: "*",
    answerInput: 100,
    equals: "=",
    src: 'img_orange.jpg',
    imgAlt: "orange",
    checkAnswer: jest.fn(),
    setAnswerInput: jest.fn()
  };

//   {props.value1} {props.operation} {props.value2} {props.equals}

  it("successfully renders the component, matches snapshot", () => {
    const { asFragment } = render(<PicQuestionCard {...mockedProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

it("renders the provided 'value1', 'value2', 'operation', 'equals' prop content to the DOM", () => {
    render(<PicQuestionCard  {...mockedProps} />);
    expect(screen.getByTestId('picQuestion').textContent).toBe("50 * 2 =");

});

it("alt contains provided 'imgAlt' prop content", () => {
    render(<PicQuestionCard  {...mockedProps} />);
    const imageDiv = screen.getAllByRole("img")[0];
    expect(imageDiv.alt).toContain("orange");
   });

   it("src contains provided 'imgSrc' prop content", () => {
    render(<PicQuestionCard  {...mockedProps} />);
    const imageDiv = screen.getAllByRole("img")[0];
    expect(imageDiv.src).toContain("img_orange.jpg");
   });

it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
    render(<PicQuestionCard  {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    expect(mockedProps.checkAnswer).toHaveBeenCalled();
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();
  
  });

  
  it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
  render(<PicQuestionCard  {...mockedProps} />);
  const input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}`)
  expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
  expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
  
});


it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
render(<PicQuestionCard  {...mockedProps} />);
const input = screen.getByRole('spinbutton')
userEvent.type(input, `${mockedProps.answerInput}`)
expect(input).toHaveValue(mockedProps.answerInput)
        
});

it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
  render(<PicQuestionCard {...mockedProps} />);
  let input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
  input = screen.findByRole('spinbutton')
  expect(input.value).toBeUndefined()
  
});








      
})





   
