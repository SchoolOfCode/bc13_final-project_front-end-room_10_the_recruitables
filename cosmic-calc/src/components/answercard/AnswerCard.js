import React from "react";
import "./answerCard.css";

export default function AnswerCard(props) {
  return (
    <div
      className="answerDiv"
      style={{ visibility: props.answerVisible ? "visible" : "hidden" }}
    >
      <div
        data-testid="statementDiv"
        className="statementDiv"
        style={{ visibility: props.answerVisible ? "visible" : "hidden" }}
      >
        <h3 className="h3ResultGame" data-testid="h3ResultGame">
          The correct answer is:{" "}
        </h3>
        <h3 className="h3ResultAnswerGame" data-testid="h3ResultAnswerGame">
          {props.result}
        </h3>
      </div>
      <button
        data-testid="nextQuestionGameButton"
        className="newQuestionGameButton"
        onClick={props.newQuestion}
        style={{ visibility: props.answerVisible ? "visible" : "hidden" }}
      >
        Next Question
      </button>
    </div>
  );
}
