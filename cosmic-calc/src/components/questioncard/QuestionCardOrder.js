import React from "react";
import "./questionCard.css";

export default function QuestionCardOrder(props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <h2 className="h2QuestionGame" data-testid='order'>
        {props.value1}, {props.value2}, {props.value3}, {props.value4}
      </h2>
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
    </div>
  );
}
