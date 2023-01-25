import React from "react";
import "./picQuestionCard.css";

export default function PicQuestionCard(props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <h2 className="h2QuestionGame" data-testid='picQuestion'>
        {props.value1} {props.operation} {props.value2} {props.equals}
      </h2>
      <img className="QuestionImg" src={props.src} alt={props.imgAlt} />
      <input
        className="inputGame"
        type="number"
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
  );
}
