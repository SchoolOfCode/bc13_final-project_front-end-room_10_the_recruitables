import React from "react";
import "./countersQuestionCard.css";

export default function CountersQuestionCard(props) {
  const starArray2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="questionDiv">
      <h1> {props.h1}</h1>
      <div className="elementsInRow">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <div className="value1and2stars">
          {starArray2
            .filter((star, index) => index < props.value1)
            .map((star) => {
              return (
                <img
                  className="starsimage"
                  src="https://i.ibb.co/kmp9kkp/OneStar.png"
                  alt="star-counter"
                />
              );
            })}
        </div>
        <h2>{props.operation}</h2>
        <div className="value1and2stars">
          {starArray2
            .filter((star, index) => index < props.value2)
            .map((star) => {
              return (
                <img
                  className="starsimage"
                  src="https://i.ibb.co/kmp9kkp/OneStar.png"
                  alt="star-counter"
                />
              );
            })}
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
