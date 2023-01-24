import React from "react";
import "./questionCardColumn.css";

export default function QuestionCardColumn(props) {
  return (
    <div className="questionDiv">
      <div className="h1-div">
        <h1> {props.h1}</h1>
      </div>
      <div className="QandA">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <div className="numbersColumn">
          <h2 className="h2QuestionGame">{props.value1}</h2>
          <h2 className="h2QuestionGame">
            {props.operation}
            {"  "}
            {props.value2}
          </h2>
        </div>
        <input
          className="inputGame"
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
      </div>
    </div>
  );
}
