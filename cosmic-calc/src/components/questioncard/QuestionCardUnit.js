import React from "react";
import "./questionCard.css";

export default function QuestionCardUnit (props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <h2 className="h2QuestionGame">
        {props.value1} {props.unit} {props.value2} {props.operation} {props.unit} {props.equals}
      </h2>
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
      <h2 className="h2QuestionGame">{props.conversionUnit}</h2>
    </div>
  );
}

