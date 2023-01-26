import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import CountersQuestionCard from "./CountersQuestionCard";

describe("<CountersQuestionCard/>", () => {
    const mockedProps = {
        noOfQuestions: 10,
        checkAnswer: jest.fn(),
        answerInput: 30,
        setAnswerInput: jest.fn(),
        operation:  "+",
        src: "https://www.example.com/image1.png",
        imgAlt: "apple"
        
    };
  
    it("src contains provided 'src' prop content", () => {

        render(<CountersQuestionCard {...mockedProps} />);
        const imageDiv = screen.getAllByRole("img")[0];
        expect(imageDiv.src).toContain("https://www.example.com/image1.png");

    });

    it("alt contains provided 'imgAlt' prop content", () => {
        render(<CountersQuestionCard {...mockedProps} />);
        const imageDiv = screen.getAllByRole("img")[0];
        expect(imageDiv.alt).toContain("apple");
       });

    
     it("renders the provided 'operation' prop content to the DOM", () => {

        render(<CountersQuestionCard  {...mockedProps} />);
        const operation = screen.getByText("+");
        expect(operation).toBeInTheDocument();
    });

    it("Typing in a value and pressing 'Enter' key fires  the provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
      render(<CountersQuestionCard  {...mockedProps} />);

      const input = screen.getByRole('spinbutton')
      userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
      expect(mockedProps.checkAnswer).toHaveBeenCalled();
      expect(mockedProps.setAnswerInput).toHaveBeenCalled();

    
    });
  
    
    it("Only typing in a value without pressing 'Enter' key fires 'setAnswerInput' but not 'checkAnswer' callback prop." , () => {
    render(<CountersQuestionCard  {...mockedProps} />);
    const input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}`)
    expect(mockedProps.setAnswerInput).toHaveBeenCalled();  
    expect(mockedProps.checkAnswer).not.toHaveBeenCalled();
    
  });
  
  
  it("Typing in the provided 'anwerInput' prop renders 'displayValue' to the input field" , () => {
  render(<CountersQuestionCard  {...mockedProps} />);
  const input = screen.getByRole('spinbutton')
  userEvent.type(input, `${mockedProps.answerInput}`)
  expect(input).toHaveValue(mockedProps.answerInput)
          
  });
  
  it("Typing in a value and pressing 'Enter' key clears the input field" , () => {
    render(<CountersQuestionCard {...mockedProps} />);
    let input = screen.getByRole('spinbutton')
    userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
    input = screen.findByRole('spinbutton')
    expect(input.value).toBeUndefined()
    
  });
    

  });