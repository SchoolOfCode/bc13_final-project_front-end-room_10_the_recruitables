import React from "react";
import "./fractionsQuestionCard.css";

export default function FractionsQuestionCard(props) {
  return (
    <div className="questionDiv">
      <div className="question-text">
        <h1 className="fractions-Question-h1"> {props.h1}</h1>
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")"}</h2>
        <h1>Which of these is a {props.fractionWord} circle?</h1>
      </div>
      <div className="shapes-div">
        <button
          className="half-circle"
          onClick={() => props.checkAnswer("half")}
        ></button>
        <button
          className="quarter-circle"
          onClick={() => props.checkAnswer("quarter")}
        ></button>
        <button
          className="three-q-circle"
          onClick={() => props.checkAnswer("three-quarters")}
        ></button>
        <button
          className="circle-shape"
          onClick={() => props.checkAnswer("whole")}
        ></button>
      </div>
    </div>
  );
}
