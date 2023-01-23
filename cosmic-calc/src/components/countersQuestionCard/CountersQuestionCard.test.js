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

  
    it("Typing in provided 'anwerInput' prop and pressing 'enter' key fires  provided 'checkAnswer' and 'setAnswerInput' callback props" , () => {
      render(<CountersQuestionCard {...mockedProps} />);
      const input = screen.getByRole('spinbutton')
      userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
      expect(mockedProps.checkAnswer).toHaveBeenCalled();
      expect(mockedProps.setAnswerInput).toHaveBeenCalled();
    });
  
    it("Typing in provided 'anwerInput' prop renders 'displayValue' to the input box" , () => {
        render(<CountersQuestionCard {...mockedProps} />);
        const input = screen.getByRole('spinbutton')
        userEvent.type(input, `${mockedProps.answerInput}`)
        // expect(screen.getByRole('spinbutton')).toHaveValue(mockedProps.answerInput); 
        expect(screen.getByDisplayValue(30)).toBeInTheDocument()
                
      });
   
  
      it("Typing in provided 'anwerInput' prop and pressing 'enter' key clears input field" , () => {
        render(<CountersQuestionCard {...mockedProps} />);
        let input = screen.getByRole('spinbutton')
        userEvent.type(input, `${mockedProps.answerInput}, {enter}`)
        input = screen.findByRole('spinbutton')
        expect(input.value).not.toBeDefined()
          
      });
  });