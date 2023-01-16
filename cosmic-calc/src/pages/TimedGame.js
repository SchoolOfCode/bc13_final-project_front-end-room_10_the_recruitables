import React, { useState } from "react";

 function TimedGame() {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);
 const [time, setTime] = useState(60);
    const [timer, setTimer] = useState(null);
    const [isOn, setIsOn] = useState(false);


    // make these two functions in another doc so reusable! 
    const checkAnswer = () => {
        if (parseInt(answer) === num1 * num2) {
          setResult("Correct!");
          setScore(score + 1);
          setVisible(true);
          newQuestion();
        } else {
          setResult("Incorrect! The answer is " + num1 * num2);
          setVisible(true);
        }
      };
    
      const newQuestion = () => {
        setNum1(Math.floor(Math.random() * 12) + 1);
        setNum2(Math.floor(Math.random() * 12) + 1);
        setAnswer("");
        setResult("");
        setVisible(false);
      };

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

        return (
            <div>
            <h1>Times Tables Game</h1>
            <h2>Score: {score}</h2>
            <h2>What is {num1} x {num2}?</h2>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={checkAnswer}>Check Answer</button>
            <h3>{result}</h3>
            <button onClick={newQuestion} style={{ visibility: visible ? "visible" : "hidden" }}>
                Next Question
    </button>
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

export default TimedGame;