import React, { useState, useEffect } from "react";
import "./questionCard.css";


export default function QuestionCard(props) {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [operation, setOperation] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    let [value1, operation, value2] = props.functionQuestion();
    setValue1(value1);
    setOperation(operation);
    setValue2(value2);
  }, []);

  const checkAnswer = () => {
    let [questionResult, correctAnswer] = props.functionAnswer(
      [value1, operation, value2],
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
    let [value1, operation, value2] = props.functionQuestion();
    setValue1(value1);
    setValue2(value2);
    setOperation(operation);
    let [questionResult, correctAnswer] = props.functionAnswer(
      [value1, operation, value2],
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
            {value1} {operation} {value2} = {" "}
          </h2>
          <input
            className="inputGame"
            type="{props.inputType}"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            onKeyDown={(e) => {
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


