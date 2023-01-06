import React from "react";
import { checkAnswer } from "../functions/Functions";
// import NextQButton from "../buttons/NextQButton";

export default function AnswerCard(props) {
  // if (checkAnswer === true) {
  //   return <h1>HELELLELELELE</h1>;
  // } else {
  return (
    props.answerVisible && (
      <div>
        <div>
          <h1>Correct! {props.answer} </h1>
        </div>
      </div>
    )
  );
}
