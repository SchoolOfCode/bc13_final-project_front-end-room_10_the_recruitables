import React from "react";
import "./shapeFractionsQCard.css";

export default function ShapesFractionsQuestionCard(props) {
  return (
    <div className="questionDiv">
      <div className="QuestionNumberAndQuestion">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>

        <h1>
          Click on the image which shows {""}
          {props.shape}!
        </h1>
      </div>

      <div className="shapes-div-1">
        <button
          className="onehalf-shape"
          onClick={() => props.checkAnswer("one-half")}
        ></button>
        <button
          className="onethird-shape"
          onClick={() => props.checkAnswer("one-third")}
        ></button>
        <button
          className="onequarter-shape"
          onClick={() => props.checkAnswer("one-quarter")}
        ></button>
      </div>
      <div className="shapes-div-2">
        <button
          className="oneseventh-shape"
          onClick={() => props.checkAnswer("one-seventh")}
        ></button>
        <button
          className="oneeigth-shape"
          onClick={() => props.checkAnswer("one-eighth")}
        ></button>
        {/* <button
            className="hexagon-shape"
            onClick={() => props.checkAnswer("hexagon")}
          ></button> */}
        <button
          className="twothirds-shape"
          onClick={() => props.checkAnswer("two-thirds")}
        ></button>
      </div>
    </div>
  );
}
