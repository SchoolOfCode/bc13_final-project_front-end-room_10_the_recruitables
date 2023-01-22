import React from "react";
import "./questionCard.css";
import Star from "../Star/star";

export default function CountersQuestionCard(props) {
  let Value1Arr = [];
  Value1Arr.length = props.value1;
  let Value2Arr = [];
  Value2Arr.length = props.value2;
  console.log(Value1Arr, Value2Arr);
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
      <div>
        {Value1Arr.map((star) => {
          return <Star />;
        })}
      </div>
      <h2>{props.operation}</h2>
      <div>
        {Value2Arr.map((star) => {
          return <Star />;
        })}
        ;
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
  );
}
