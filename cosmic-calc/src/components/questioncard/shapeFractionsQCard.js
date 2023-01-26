import React from "react";
import "./ShapesQuestionCard.css";

export default function ShapesQuestionCard(props) {
  return (
    <div className="questionDiv">
      <div className="QuestionNumberAndQuestion">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>

        <h1>
          Click on the {""}
          {props.shape}!
        </h1>
      </div>

      <div className="shapes-div-1">
        <button
          className="onehalf-shape"
          onClick={() => props.checkAnswer("half")}
        ></button>
        <button
          className="onethird-shape"
          onClick={() => props.checkAnswer("third")}
        ></button>
        <button
          className="onequarter-shape"
          onClick={() => props.checkAnswer("quarter")}
        ></button>
      </div>
      <div className="shapes-div-2">
        <button
          className="oneseventh-shape"
          onClick={() => props.checkAnswer("seventh")}
        ></button>
        <button
          className="oneeigth-shape"
          onClick={() => props.checkAnswer("eight")}
        ></button>
        {/* <button
            className="hexagon-shape"
            onClick={() => props.checkAnswer("hexagon")}
          ></button> */}
        <button
          className="twothirds-shape"
          onClick={() => props.checkAnswer("twothirds")}
        ></button>
      </div>
    </div>
  );
}
