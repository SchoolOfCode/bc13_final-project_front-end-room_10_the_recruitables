import React, {useState} from "react";
import "./questionCard.css";

export default function QuestionCardTimer(props) {
  const [time, setTime] = useState(60);
  const [timer, setTimer] = useState(null);
  const [isOn, setIsOn] = useState(false);

     //   start timer 
     const handleStart = () => {
      setTimer(setInterval(() => {
          setTime(time => time - 1);
      }, 1000));
  }

  // set time for 1, 2 and 5 minutes
  const oneMin = () => {
      setTime(60);
  }

  const twoMin = () => {
      setTime(120);
  }

  const fiveMin = () => {
      setTime(300);
  }

  // stop timer
  const handleStop = () => {
      clearInterval(timer);
      setIsOn(false);
  }

  // reset timer
  const handleReset = () => {
      clearInterval(timer);
      setTime(60);
      setIsOn(false);
  }

  // show time as a countdown
  const showTime = () => {
      let minutes = Math.floor(time / 60);
      let seconds = time - (minutes * 60);

      seconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${minutes}:${seconds}`;
  }

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
    <div className="questionDiv">
    <h1> {props.h1}</h1>
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
       <h1>Timer</h1>
            <h2>{showTime()}</h2>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={oneMin}>1 min</button>
            <button onClick={twoMin}>2 min</button>
            <button onClick={fiveMin}>5 min</button>
    </div>
  );
}
