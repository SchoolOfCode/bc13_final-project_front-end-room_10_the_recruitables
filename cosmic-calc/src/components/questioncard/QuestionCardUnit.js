import React from "react";
import "./questionCardUnit.css";

export default function QuestionCardUnit(props) {
  return (
    <div className="questionDiv">
      <h1> {props.h1}</h1>
      <div className="questionDisplay">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <h2 className="h2QuestionGame">
          {props.value1} {props.unit} {props.value2} {props.operation}{" "}
          {props.unit} {props.equals}
        </h2>
        <div className="answerAndUnits">
          <input
            className="inputGameUnits"
            type="number"
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
          <h2 className="h2QuestionGame">{props.conversionUnit}</h2>
        </div>
      </div>
    </div>
  );
}
