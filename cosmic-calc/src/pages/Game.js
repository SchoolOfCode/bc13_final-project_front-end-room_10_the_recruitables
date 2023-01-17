import React, { useState, useEffect } from "react";
import "./game.css";
import astronaut from "../images/Background_Buttons/Astronaut.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import useSound from "use-sound";
import correct from ".././components/sound/FX/correct.mp3";
import wrong from ".././components/sound/FX/wrong.mp3";
import win from ".././components/sound/FX/win.mp3";

export default function Game() {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [playCorrect] = useSound(correct, { interrupt: true, volume: 0.3 });
  const [playWrong] = useSound(wrong, { interrupt: true, volume: 0.3 });
  const [playWin] = useSound(win, {
    playbackRate: +1.1,
    interrupt: true,
    volume: 0.5,
  });

  useEffect(() => {
    if (noOfQuestions === 4) {
      onAuthStateChanged(auth, (user) => {
        updateScore(score, user);
      });
    }
  }, [noOfQuestions, score]);

  if (noOfQuestions === 4) {
    playWin();
  }

  const checkAnswer = () => {
    setNoOfQuestions(noOfQuestions + 1);
    if (parseInt(answer) === num1 * num2) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion();
    } else {
      playWrong();
      setResult(num1 * num2);
      setAnswerVisible(true);
    }
  };
  const newQuestion = () => {
    setNum1(Math.floor(Math.random() * 12) + 1);
    setNum2(Math.floor(Math.random() * 12) + 1);
    setAnswer("");
    setResult("");
    setAnswerVisible(false);
  };

  const newGame = () => {
    setNoOfQuestions(1);
    setScore(0);
    newQuestion();
  };

  const updateScore = async (score, user) => {
    let email = await user.email;

    const response = await fetch(
      `http://localhost:3001/api/users/email/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total_score: score }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  if (noOfQuestions < 4) {
    return (
      <div className="gameDiv">
        <div
          className="answerDiv"
          style={{ visibility: answerVisible ? "visible" : "hidden" }}
        >
          <div
            className="statementDiv"
            style={{ visibility: answerVisible ? "visible" : "hidden" }}
          >
            <h3 className="h3ResultGame">The correct answer is: </h3>
            <h3 className="h3ResultAnswerGame"> {result}</h3>
          </div>
          <button
            className="newQuestionGameButton"
            onClick={newQuestion}
            style={{ visibility: answerVisible ? "visible" : "hidden" }}
          >
            Next Question
          </button>
        </div>
        <div className="questionDiv">
          <h2 className="h2QuestionGame">{noOfQuestions + ")  "}</h2>
          <h2 className="h2QuestionGame">
            {num1} x {num2} =
          </h2>
          <input
            className="inputGame"
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              // console.log(e);
              if (e.key === "Enter") {
                checkAnswer();
                setAnswer("");
              }
            }}
          />
          {/* <button className="buttonGame" onClick={navigateToPage}> */}
          {/* Check Answer
          </button> */}
        </div>
        <div className="scoreDiv">
          <h2 className="h2ScoreGame">Score: {score}</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="endDiv">
        <img className="astronaut" src={astronaut} alt="astronaut" />
        <div className="endGameDiv">
          <h1>Game Over!</h1>
          <h2>Your final score was</h2>
          <h3>{score}</h3>
          <button className="endGameButton" onClick={newGame}>
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
