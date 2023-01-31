import React from "react";
import "./questionCard.css";

export default function QuestionCard(props) {
  return (
    <div className="questionDiv">
      <div className="column-div">
        <h1> {props.h1}</h1>
        <div className="questionDisplay">
          <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
          <h2 className="h2QuestionGame" data-testid="questionCard">
            {props.value1} {props.operation} {props.value2} {props.equals}
          </h2>
          <input
            className="inputGame"
            type={props.inputType}
            value={props.answerInput}
            onChange={(e) => props.setAnswerInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.checkAnswer();
                props.setAnswerInput("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
