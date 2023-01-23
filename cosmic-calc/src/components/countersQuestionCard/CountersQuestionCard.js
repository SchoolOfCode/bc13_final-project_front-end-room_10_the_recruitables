import React from "react";
import "./CountersQuestionCard.css";

export default function CountersQuestionCard(props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <img className="QuestionImg" src={props.src} alt={props.imgAlt} />
      <h2 className="h2QuestionGame">{props.operation}</h2>
      <img className="QuestionImg" src={props.src} alt={props.imgAlt} />
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
