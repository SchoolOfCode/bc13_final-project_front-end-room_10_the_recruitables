import React, { useState, useEffect, useNavigate } from "react";

import "./game.css";
import astronaut from "../images/Background_Buttons/Astronaut.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import AnswerCard from "../components/answercard/AnswerCard";
import QuestionCard from "../components/questioncard/QuestionCard";
import Score from "../components/score/Score";

import {
  yearOnePlanetFiveQuestion,
  yearOnePlanetFiveAnswer,
  yearOnePlanetSixQuestion,
  yearOnePlanetSixAnswer,
} from "../components/functions/yearOneFunctions";

export default function Game() {
  let points = 45;
  const [score, setScore] = useState(0);

  const [answerInput, setAnswerInput] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (noOfQuestions === 4) {
      onAuthStateChanged(auth, (user) => {
        updateScore(score, user);
      });
    }
  }, [noOfQuestions, score]);

  //yearOnePlanetFive
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [operation, setOperation] = useState("");

  useEffect(() => {
    let [value1, operation, value2] = yearOnePlanetFiveQuestion();
    console.log(value1, operation, value2);
    setValue1(value1);
    setOperation(operation);
    setValue2(value2);
  }, []);

  const checkAnswer5 = () => {
    console.log("Check answer called");
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [value1, operation, value2],
      answerInput
    );
    console.log(questionResult, correctAnswer);

    if (questionResult === true) {
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion5();
    } else {
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion5 = () => {
    let [value1, operation, value2] = yearOnePlanetFiveQuestion();
    setValue1(value1);
    setValue2(value2);
    setOperation(operation);
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [value1, operation, value2],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  //yearOnePlanetSix

  const [number, setNumber] = useState(0);
  const [word, setWord] = useState("");

  useEffect(() => {
    let [number, word] = yearOnePlanetSixQuestion();
    setNumber(number);
    setWord(word);
  }, []);

  const checkAnswer6 = () => {
    console.log("Check answer called");
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearOnePlanetSixAnswer(
      [number, word],
      answerInput
    );

    if (questionResult === true) {
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion6();
    } else {
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion6 = () => {
    let [number, word] = yearOnePlanetSixQuestion();
    setNumber(number);
    setWord(word);
    let [questionResult, correctAnswer] = yearOnePlanetSixAnswer(
      [number, word],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  //Do not change below here

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

  if (points < 50) {
    if (noOfQuestions < 4) {
      return (
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion5}
          />
          <QuestionCard
            noOfQuestions={noOfQuestions}
            value1={value1}
            operation={operation}
            value2={value2}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer5}
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
            <button
              className="endGameButton"
              onClick={() => {
                setNoOfQuestions(1);
                setAnswerVisible(false);
                setScore(0);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      );
    }
  } else if (50 <= points < 100) {
    if (noOfQuestions < 4) {
      return (
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion6}
          />
          <QuestionCard
            noOfQuestions={noOfQuestions}
            value1={"What is"}
            operation={word}
            value2={"in numbers?"}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer6}
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
            <button
              className="endGameButton"
              onClick={() => {
                setNoOfQuestions(1);
                setAnswerVisible(false);
                setScore(0);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      );
    }
  }
}
