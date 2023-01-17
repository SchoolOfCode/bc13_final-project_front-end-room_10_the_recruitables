import React, { useState, useEffect, useNavigate } from "react";

import "./game.css";
import astronaut from "../images/Background_Buttons/Astronaut.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import AnswerCard from "../components/answercard/AnswerCard";
import QuestionCard from "../components/questioncard/QuestionCard";
import Score from "../components/score/Score";

import {
  yearOnePlanetFive,
  yearOnePlanetFiveAnswer,
} from "../components/functions/yearOneFunctions";

export default function Game() {
  const [score, setScore] = useState(0);

  const [answerInput, setAnswerInput] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [result, setResult] = useState("");

  let [value1, operation, value2] = yearOnePlanetFive();
  console.log(value1, operation, value2);

  useEffect(() => {
    if (noOfQuestions === 4) {
      onAuthStateChanged(auth, (user) => {
        updateScore(score, user);
      });
    }
  }, [noOfQuestions]);

  const checkAnswer = () => {
    console.log("Check answer called");
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [value1, operation, value2],
      answerInput
    );
    console.log(questionResult, correctAnswer);
    setNoOfQuestions(noOfQuestions + 1);
    if (questionResult === true) {
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion();
    } else {
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion = () => {
    let [value1, operation, value2] = yearOnePlanetFive();
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [value1, operation, value2],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
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
          value1={value1}
          operation={operation}
          value2={value2}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer}
        />
        <Score score={score} />
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
