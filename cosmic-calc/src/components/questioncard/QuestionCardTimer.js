import React, { useState } from "react";
import "./questionCardTimer.css";

export default function QuestionCardTimer(props) {
  const [time, setTime] = useState(60);
  const [timer, setTimer] = useState(null);
  const [isOn, setIsOn] = useState(false);

  //   start timer
  const handleStart = () => {
    setTimer(
      setInterval(() => {
        setTime((time) => Math.max(time - 1, 0));
      }, 1000)
    );
  };

  // set time for 1, 2 and 5 minutes
  const oneMin = () => {
    setTime(60);
  };

  const twoMin = () => {
    setTime(120);
  };

  const fiveMin = () => {
    setTime(300);
  };

  // reset timer
  const handleReset = () => {
    clearInterval(timer);
    setTime(60);
    setIsOn(false);
  };

  // show time as a countdown
  const showTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  if (time === 0) {
    return (
      <div className="endDiv">
        <img className="astronaut" src={props.astronaut} alt="astronaut" />
        <div className="endGameDiv">
          <h1>Game Over!</h1>
          <h2>Your final score was {props.score}</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="questionDivTimer">
      <h1> {props.h1}</h1>
      <div className="actualQuestionDiv">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <h2 className="h2QuestionGame">
          {props.value1} {props.operation} {props.value2} {props.equals}
        </h2>
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

      <h2 className="time">{showTime()}</h2>
      <div className="timerDiv">
        <button className="buttonTimer" onClick={handleStart}>
          Start
        </button>
        <button className="buttonTimer" onClick={oneMin}>
          1 minute
        </button>
        <button className="buttonTimer" onClick={twoMin}>
          2 minute
        </button>
        <button className="buttonTimer" onClick={fiveMin}>
          5 minute
        </button>
        <button className="buttonTimer" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
