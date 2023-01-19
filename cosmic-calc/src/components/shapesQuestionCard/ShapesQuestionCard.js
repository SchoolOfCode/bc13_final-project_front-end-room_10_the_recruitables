import React from "react";
import "./ShapesQuestionCard.css";

export default function ShapesQuestionCard(props) {
  return (
    <div className="questionDiv">
      <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>

      <h1>Click on the{props.shape}</h1>
      <div className="shapes-div">
        <button
          className="square-shape"
          onClick={() => props.checkAnswer("square")}
        ></button>
        <button
          className="rectangle-shape"
          onClick={() => props.checkAnswer("rectangle")}
        ></button>
        <button
          className="circle-shape"
          onClick={() => props.checkAnswer("circle")}
        ></button>
        <button
          className="triangle-shape"
          onClick={() => props.checkAnswer("triangle")}
        ></button>
        <button
          className="pentagon-shape"
          onClick={() => props.checkAnswer("pentagon")}
        ></button>
        <button
          className="hexagon-shape"
          onClick={() => props.checkAnswer("hexagon")}
        ></button>

        <button
          className="octagon-shape"
          onClick={() => props.checkAnswer("octagon")}
        ></button>
      </div>
    </div>
  );
}
