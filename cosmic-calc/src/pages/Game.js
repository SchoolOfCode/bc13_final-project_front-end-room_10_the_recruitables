import React, { useState, useEffect, useContext } from "react";
import "./game.css";
import astronaut from "../images/Background_Buttons/Astronaut.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import useSound from "use-sound";
import correct from ".././components/sound/FX/correct.mp3";
import wrong from ".././components/sound/FX/wrong.mp3";
import win from ".././components/sound/FX/win.mp3";
import { ScoreContext } from "../components/score/ScoreContext";
import AnswerCard from "../components/answercard/AnswerCard";
import QuestionCard from "../components/questioncard/QuestionCard";
import ShapesQuestionCard from "../components/shapesQuestionCard/ShapesQuestionCard";
import Score from "../components/score/Score";
import PicQuestionCard from "../components/picQuestionCard/picQuestionCard";

import {
  yearOnePlanetFourQuestion,
  yearOnePlanetFourAnswer,
  yearOnePlanetFiveQuestion,
  yearOnePlanetFiveAnswer,
  yearOnePlanetSixQuestion,
  yearOnePlanetSixAnswer,
  randomNumberGenerator,
  giveRandomShape,
  checkShapeAnswer,
} from "../components/functions/yearOneFunctions";

export default function Game() {
  const [score, setScore] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [playCorrect] = useSound(correct, { interrupt: true, volume: 0.3 });
  const [playWrong] = useSound(wrong, { interrupt: true, volume: 0.3 });
  const [playWin] = useSound(win, {
    playbackRate: +1.1,
    interrupt: true,
    volume: 0.5,
  });
  const [result, setResult] = useState("");
  const context = useContext(ScoreContext);
  let points = 5;
  //let points = context.score;
  console.log(context);

  console.log("Points = ", points);

  useEffect(() => {
    if (noOfQuestions === 6) {
      onAuthStateChanged(auth, (user) => {
        updateScore(score, user);
      });
    }
  }, [noOfQuestions, score]);

  if (noOfQuestions === 6) {
    playWin();
  }

  // yearOnePlanetOne

  //const [numberLineID, setNumberLineID] = useState(0);
  const [numberLineImg, setNumberLineImg] = useState("");
  const [correctAnswer1, setCorrectAnswer1] = useState(0);
  const [numberLineArray, setNumberLineArray] = useState([]);

  useEffect(() => {
    async function getNumberLine() {
      const response = await fetch(
        `http://localhost:3001/api/mathsQuestions/numberLines`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.payload) {
        let newNumberLineArray = data.payload;
        setNumberLineArray(data.payload);
        let randomID = randomNumberGenerator(10);
        //setNumberLineID(randomID);
        setNumberLineImg(newNumberLineArray[randomID].img_url);
        setCorrectAnswer1(newNumberLineArray[randomID].answer);
      }
    }
    getNumberLine();
  }, []);

  const checkAnswer1 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let questionResult = "";
    if (correctAnswer1 == answerInput) {
      questionResult = true;
    } else {
      questionResult = false;
    }
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion1();
    } else {
      playWrong();
      setResult(correctAnswer1);
      setAnswerVisible(true);
    }
  };

  const newQuestion1 = () => {
    let randomID = randomNumberGenerator(10);
    setNumberLineImg(numberLineArray[randomID].img_url);
    setCorrectAnswer1(numberLineArray[randomID].answer);
    setResult("");
    setAnswerVisible(false);
  };

  //yearOnePlanetTwo

  const [shape, setShape] = useState("square");

  useEffect(() => {
    let newShape = giveRandomShape();
    setShape(newShape);
  }, []);

  function checkAnswer2(playerInput) {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = checkShapeAnswer(playerInput, shape);
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion2();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  }

  const newQuestion2 = (playerInput) => {
    let newShape = giveRandomShape();
    setShape(newShape);
    let [questionResult, correctAnswer] = checkShapeAnswer(
      playerInput,
      newShape
    );
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // yearOnePlanetFour
  const [Y1P4knownValue, setY1P4knownValue] = useState(0);
  const [Y1P4totalValue, setY1P4totalValue] = useState(0);

  useEffect(() => {
    let [Y1P4knownValue, Y1P4totalValue] = yearOnePlanetFourQuestion();
    setY1P4knownValue(Y1P4knownValue);
    setY1P4totalValue(Y1P4totalValue);
  }, []);

  const checkAnswer4 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearOnePlanetFourAnswer(
      [Y1P4knownValue, Y1P4totalValue],
      answerInput
    );
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion4();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion4 = () => {
    let [Y1P4knownValue, Y1P4totalValue] = yearOnePlanetFourQuestion();
    setY1P4knownValue(Y1P4knownValue);
    setY1P4totalValue(Y1P4totalValue);
    let [questionResult, correctAnswer] = yearOnePlanetFourAnswer(
      [Y1P4knownValue, Y1P4totalValue],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

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
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion5();
    } else {
      playWrong();
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
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion6();
    } else {
      playWrong();
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

  // yearOnePlanetEight
  const [Y1P8knownValue, setY1P8knownValue] = useState(0);
  const [Y1P8totalValue, setY1P8totalValue] = useState(0);

  useEffect(() => {
    let [Y1P8knownValue, Y1P8totalValue] = yearOnePlanetFourQuestion(8);
    setY1P8knownValue(Y1P8knownValue);
    setY1P8totalValue(Y1P8totalValue);
  }, []);

  const checkAnswer8 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearOnePlanetFourAnswer(
      [Y1P8knownValue, Y1P8totalValue],
      answerInput
    );
    console.log(questionResult, correctAnswer);
    setAnswerInput("");

    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion8();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion8 = () => {
    let [Y1P8knownValue, Y1P8totalValue] = yearOnePlanetFourQuestion(8);
    setY1P8knownValue(Y1P8knownValue);
    setY1P8totalValue(Y1P8totalValue);
    let [questionResult, correctAnswer] = yearOnePlanetFourAnswer(
      [Y1P8knownValue, Y1P8totalValue],
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

  if (noOfQuestions === 6) {
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
  } else if (points === 5) {
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion1}
        />
        <PicQuestionCard
          src={numberLineImg}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={"Which number is missing?"}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer1}
        />
        <Score score={score} />
      </div>
    );
  } else if (points === 7) {
    console.log("In shapes game");

    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion2}
        />
        {/* <ShapesQuestionCard
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          shape={shape}
          // setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer2}
        /> */}
        <Score score={score} />
      </div>
    );
  } else if (points < 20) {
    console.log("Inside points < 20 if statement");
    console.log("points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion4}
        />
        <QuestionCard
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={`What do I need to add to ${Y1P4knownValue} to make 10?`}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer4}
        />
        <Score score={score} />
      </div>
    );
  } else if (points < 50) {
    console.log("Inside 20 <= points < 50 if statement");
    console.log("points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion5}
        />
        <QuestionCard
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={value1}
          operation={operation}
          value2={value2}
          equals={"="}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer5}
        />
        <Score score={score} />
      </div>
    );
  } else if (points < 100) {
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion6}
        />
        <QuestionCard
          answerInput={answerInput}
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
  } else if (points >= 100) {
    console.log("Inside points >= 100 if statement");
    console.log("points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion8}
        />
        <QuestionCard
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={`What do I need to add to ${Y1P8knownValue} to make 20?`}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer8}
        />
        <Score score={score} />
      </div>
    );
  }
}
