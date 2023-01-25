import react from "react";
import "./questionCardFraction.css";

export default function QuestionCardFraction(props) {
  return (
    <div className="questionDivFraction">
      <h1> {props.h1}</h1>
      <div className="questionDisplayFraction">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <div className="fractionDiv">
          <h2 className="h2QuestionGameValue1">{props.value1}</h2>
          <h2 className="h2QuestionGameValue2">{props.value2}</h2>
        </div>
        <h2 className="h2QuestionGame">of {props.value3}</h2>
        <h2 className="h2QuestionGame">=</h2>
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
