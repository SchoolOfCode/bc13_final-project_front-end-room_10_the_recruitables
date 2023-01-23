import React from "react";
import "./questionCard.css";

export default function QuestionCardRound(props) {
  return (
    <div className="questionDiv">
    <h1> {props.h1}</h1>
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <h2 className="h2QuestionGame">
        Round {props.value1} to the nearest {props.value2} 
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
