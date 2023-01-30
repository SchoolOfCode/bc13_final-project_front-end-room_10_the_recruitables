import React, { useState, useEffect } from "react";
import "./questionCardCompare.css";

export default function QuestionCardCompare(props) {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    let [value1, value2] = props.functionQuestion();
    setValue1(value1);
    setValue2(value2);
  }, []);

  const checkAnswer = () => {
    let [questionResult, correctAnswer] = props.functionAnswer(
      [value1, value2],
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
      <h1> {props.h1}</h1>
      <div className="compareQandA">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <h2 className="h2QuestionGame">{props.value1}</h2>
        <input
          className="inputGame"
          type="text"
          value={props.answerInput}
          onChange={(e) => props.setAnswerInput(e.target.value)}
          onKeyDown={(e) => {
            // console.log(e);
            if (e.key === "Enter") {
              props.checkAnswer();
              props.setAnswerInput("");
            }
          }}
        />
        <h2>{props.value2}</h2>
      </div>
    </div>
    </div>
  );
}
