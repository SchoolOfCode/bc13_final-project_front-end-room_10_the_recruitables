import React, { useState, useEffect } from "react";
import "./questionCard.css";

export default function QuestionCardThreeDig(props) {
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [thirdNumber, setThirdNumber] = useState(0);

  useEffect(() => {
    let [firstNumber, secondNumber, thirdNumber] = props.functionQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    setThirdNumber(thirdNumber);
    //console.log(firstNumber, secondNumber, thirdNumber);
  }, []);

  const checkAnswer = () => {
    let [questionResult, correctAnswer] = props.functionAnswer(
      [firstNumber, secondNumber, thirdNumber],
      answerInput
    );
    setAnswerInput("");
    if (questionResult === true) {
      props.playCorrect();
      setResult("Correct!");
      props.setScore(Number(props.score) + 1);
      newQuestion();
    } else {
      props.playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion = () => {
    props.setNoOfQuestions(props.noOfQuestions + 1);
    let [firstNumber, secondNumber, thirdNumber] = props.functionQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    setThirdNumber(thirdNumber);
    //console.log(firstNumber, secondNumber, thirdNumber);
    let [questionResult, correctAnswer] = props.functionAnswer(
      [firstNumber, secondNumber, thirdNumber],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };


  return (
    <div>  
    <div
    className="answerDiv"
    style={{ visibility: answerVisible ? "visible" : "hidden" }}
  >
    <div
      className="statementDiv"
      style={{ visibility: answerVisible ? "visible" : "hidden" }}
    >
      <h3 className="h3ResultGame">The correct answer is: </h3>
      <h3 className="h3ResultAnswerGame">{result}</h3>
    </div>
    <button
      data-testid="next-btn"
      className="newQuestionGameButton"
      onClick={newQuestion}
      style={{ visibility: answerVisible ? "visible" : "hidden" }}
    >
      Next Question
    </button>
  </div>

    <div className="questionDiv">
      <div className="column-div">
        <h1> {props.h1}</h1>
        <div className="questionDisplay">
          <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
          <h2 className="h2QuestionGame">
            {firstNumber} {props.operator} {secondNumber} {props.operator} {thirdNumber} = 
          </h2>
          <input
            className="inputGame"
            type="number"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            onKeyDown={(e) => {
              // console.log(e);
              if (e.key === "Enter") {
                checkAnswer();
                setAnswerInput("");
              }
            }}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
