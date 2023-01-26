import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import AnswerCard from "./AnswerCard";

describe("<AnswerCard/>", () => {
  const mockedProps = {
    answerVisible: true,
    answerHidden: false,
    result: 20,
    newQuestion: jest.fn(),
  };

  it("given anwerVisible prop set to true, nextQuestion button is visible in DOM ", () => {

    render(<AnswerCard answerVisible = {mockedProps.answerVisible} />)  
   
    const button=  screen.getByRole('button')
    expect(button).toBeVisible();
    
  });
  
  it("given anwerVisible prop set to false, nextQuestion button is not visible in DOM ", () => {

    render(<AnswerCard answerVisible = {mockedProps.answerHidden} />)
   
    const button = screen.getByTestId("next-btn")
    expect(button).not.toBeVisible();
    
  });

  it("click of button fires the provided 'newQuestion' callback prop", () => {
    render(<AnswerCard newQuestion={mockedProps.newQuestion} />);
    const button = screen.getByTestId("next-btn")
    userEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(mockedProps.newQuestion).toHaveBeenCalled();
  });

  it("html page contains prodided 'result' prop content", () => {
    render(<AnswerCard result={mockedProps.result} />);
    // const result= screen.getByText()
    // console.log(button.innerText);
    expect(screen.getByText('20')).toBeInTheDocument()
  });
});


