import React from "react";
import "./questionCard.css";

export default function QuestionCardThreeDig (props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <h2 className="h2QuestionGame" data-testid='threeDig'>
        {props.value1} {props.operation} {props.value2} {props.operation} {props.value3} {props.equals}
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
    </div>
  );
}

