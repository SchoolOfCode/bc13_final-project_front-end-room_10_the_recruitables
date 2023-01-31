import React from "react";
import "./picQuestionCard.css";

export default function PicQuestionCard(props) {
  return (
    <div className="pics-questionDiv">
      {props.h1}
      <div className="pics-card-question-container">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>

        <div className="pics-NumberandImg">
          <h2 className="h2QuestionGame" data-testid="picQuestion">{props.text}</h2>
          <img className="pics-QuestionImg" src={props.src} alt={props.imgAlt} />
        </div>
        
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
      </div>{" "}
    </div>
  );
}
