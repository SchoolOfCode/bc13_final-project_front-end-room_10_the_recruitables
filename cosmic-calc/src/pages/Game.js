import React, { useState, useEffect, useNavigate } from "react";

import "./game.css";
import astronaut from "../images/Background_Buttons/Astronaut.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import AnswerCard from "../components/answercard/AnswerCard";
import QuestionCard from "../components/questioncard/QuestionCard";
import Score from "../components/score/Score";
export default function Game() {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [noOfQuestions, setNoOfQuestions] = useState(1);

  useEffect(() => {
    if (noOfQuestions === 4) {
      onAuthStateChanged(auth, (user) => {
        updateScore(score, user);
      });
    }
  }, [noOfQuestions, score]);

  const checkAnswer = () => {
    setNoOfQuestions(noOfQuestions + 1);
    if (parseInt(answer) === num1 * num2) {
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion();
    } else {
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
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion}
        />
        <QuestionCard
          noOfQuestions={noOfQuestions}
          num1={num1}
          num2={num2}
          setAnswer={setAnswer}
          checkAnswer={checkAnswer}
        />
        <Score score={score} />
        {/* <div className="scoreDiv">
          <h2 className="h2ScoreGame">Score: {score}</h2>
        </div> */}
      </div>
    );
  } else {
    return (
      <div className="endDiv">
        <img className="astronaut" src={astronaut} alt="astronaut" />
        <div className="endGameDiv">
          <h1>Game Over!</h1>
          <h2>Your final score was {score}</h2>
          <button className="endGameButton" onClick={newQuestion}>
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
