import React from "react";
// import "./questionCard.css";

export default function QuestionCard(props) {
  return (
    <div className="questionDiv" data-testid="questionDiv">
      <h1> {props.h1}</h1>
      <h2
        className="h2QuestionGame"
        data-testid="h2QuestionGameNumberofQuestions"
      >
        {props.noOfQuestions + ")  "}
      </h2>
      <h2 className="h2QuestionGame">
        {props.value1} {props.operation} {props.value2} {props.equals}
      </h2>
      <input
        data-testid="inputGame"
        className="inputGame"
        type="{props.inputType}"
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
