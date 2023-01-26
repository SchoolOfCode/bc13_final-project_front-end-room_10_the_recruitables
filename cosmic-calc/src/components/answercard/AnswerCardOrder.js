import React from "react";
import "./answerCard.css";

export default function AnswerCardOrder(props) {
  return (
    <div
      className="answerDiv"
      style={{ visibility: props.answerVisible ? "visible" : "hidden" }}
    >
      <div
        className="statementDiv"
        style={{ visibility: props.answerVisible ? "visible" : "hidden" }}
      >
        <h3 className="h3ResultGame">The correct answer is: </h3>
        <h3 className="h3ResultAnswerGameOrder">{props.result}</h3>
      </div>
      <button
        className="newQuestionGameButton"
        onClick={props.newQuestion}
        style={{ visibility: props.answerVisible ? "visible" : "hidden" }}
      >
        Next Question
      </button>
    </div>
  );
}
