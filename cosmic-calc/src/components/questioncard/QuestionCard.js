import React from "react";
import "./questionCard.css";

export default function QuestionCard(props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <h2 className="h2QuestionGame">
        {props.num1} x {props.num2} =
      </h2>
      <input
        className="inputGame"
        type="number"
        value={props.answer}
        onChange={(e) => props.setAnswer(e.target.value)}
        onKeyDown={(e) => {
          // console.log(e);
          if (e.key === "Enter") {
            props.checkAnswer();
            props.setAnswer("");
          }
        }}
      />
    </div>
  );
}
