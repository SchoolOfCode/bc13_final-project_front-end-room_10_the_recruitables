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
import FractionsQuestionCard from "../components/questioncard/fractionsQuestionCard";
import CountersQuestionCard from "../components/questioncard/countersQuestionCard";
import ShapesQuestionCard from "../components/shapesQuestionCard/ShapesQuestionCard";
import Score from "../components/score/Score";
import PicQuestionCard from "../components/picQuestionCard/picQuestionCard";
import ResourceButton from "../components/questioncard/ResourceButton";

import {
  yearOnePlanetFourQuestion,
  yearOnePlanetFourAnswer,
  yearOnePlanetFiveQuestion,
  yearOnePlanetFiveAnswer,
  yearOnePlanetSixQuestion,
  yearOnePlanetSixAnswer,
  getFractionWord,
  yearOnePlanetSevenAnswer,
  giveRandomShape,
  checkShapeAnswer,
  yearOnePlanetEightQuestion,
  yearOnePlanetEightAnswer,
} from "../components/functions/Year1Functions";

import randomNumberGenerator from "../components/functions/rngFunction";

export default function Game() {
  const [score, setScore] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [inputType, setInputType] = useState("");
  console.log(inputType);

  const [playCorrect] = useSound(correct, { interrupt: true, volume: 0.3 });
  const [playWrong] = useSound(wrong, { interrupt: true, volume: 0.3 });
  const [playWin] = useSound(win, {
    playbackRate: +1.1,
    interrupt: true,
    volume: 0.5,
  });
  const [result, setResult] = useState("");
  const context = useContext(ScoreContext);

  //let points = 390;
  let points = context.score;


  useEffect(() => {
    if (noOfQuestions === 11) {
      onAuthStateChanged(auth, (user) => {
        updateScore(score, user);
      });
    }
  }, [noOfQuestions, score]);

  if (noOfQuestions === 11) {
    playWin();
  }

  // yearOnePlanetOne

  const [numberLineImg, setNumberLineImg] = useState("");
  const [correctAnswer1, setCorrectAnswer1] = useState(0);
  const [numberLineArray, setNumberLineArray] = useState([]);
  const [chosenElements, setChosenElements] = useState([]);

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
        setNumberLineImg(newNumberLineArray[randomID].img_url);
        setCorrectAnswer1(newNumberLineArray[randomID].answer);
      }
    }
    getNumberLine();
  }, []);

  const checkAnswer1 = () => {
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
    setNoOfQuestions(noOfQuestions + 1);
    console.log("About to add a new element to the random ID array!");
        console.log("Array is currently", chosenElements);
    let randomID = randomNumberGenerator(10);
    console.log("First we have chosen ", randomID);
        while (chosenElements.includes(randomID)) {
          randomID = randomNumberGenerator(10);
          console.log("That's no good! Instead try ", randomID);
        }
        console.log("Great! Now push it in!");
        setChosenElements(chosenElements.push(randomID));
        console.log("Array is now ", chosenElements);
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
    setNoOfQuestions(noOfQuestions + 1);
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

  //yearOnePlanetThree
  const [Y1P3value1, setY1P3Value1] = useState(0);
  const [Y1P3value2, setY1P3Value2] = useState(0);
  const [Y1P3operation, setY1P3Operation] = useState("");

  useEffect(() => {
    let [Y1P3value1, Y1P3operation, Y1P3value2] = yearOnePlanetFiveQuestion();
    console.log(Y1P3value1, Y1P3value2, Y1P3operation);
    setY1P3Value1(Y1P3value1);
    setY1P3Operation(Y1P3operation);
    setY1P3Value2(Y1P3value2);
  }, []);

  const checkAnswer3 = () => {
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [Y1P3value1, Y1P3operation, Y1P3value2],
      answerInput
    );
    console.log(questionResult, correctAnswer);
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion3();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion3 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [Y1P3value1, Y1P3operation, Y1P3value2] = yearOnePlanetFiveQuestion();
    setY1P3Value1(Y1P3value1);
    setY1P3Operation(Y1P3operation);
    setY1P3Value2(Y1P3value2);
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [Y1P3value1, Y1P3operation, Y1P3value2],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // yearOnePlanetFour
  const [Y1P4knownValue, setY1P4knownValue] = useState(0);

  useEffect(() => {
    let Y1P4knownValue = yearOnePlanetFourQuestion();
    setY1P4knownValue(Y1P4knownValue);
  }, []);

  const checkAnswer4 = () => {
    let [questionResult, correctAnswer] = yearOnePlanetFourAnswer(
      Y1P4knownValue,
      answerInput
    );
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion4();
      setInputType("number");
    } else {
      console.log("wrong");
      playWrong();
      setInputType("hidden");
      setResult(correctAnswer);
      setAnswerVisible(true);
      // newQuestion4();
    }
  };

  const newQuestion4 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    console.log("new question 4");
    let Y1P4knownValue = yearOnePlanetFourQuestion();
    setY1P4knownValue(Y1P4knownValue);

    let [questionResult, correctAnswer] = yearOnePlanetFourAnswer(
      Y1P4knownValue,
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
    setValue1(value1);
    setOperation(operation);
    setValue2(value2);
  }, []);

  const checkAnswer5 = () => {
    let [questionResult, correctAnswer] = yearOnePlanetFiveAnswer(
      [value1, operation, value2],
      answerInput
    );
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
    setNoOfQuestions(noOfQuestions + 1);
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
    setNoOfQuestions(noOfQuestions + 1);
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

  //yearOnePlanetSeven
  const [fractionWord, setFractionWord] = useState("");

  useEffect(() => {
    let newFractionWord = getFractionWord();
    setFractionWord(newFractionWord);
  }, []);

  function checkAnswer7(playerInput) {
    console.log(fractionWord);
    console.log(playerInput);

    let [questionResult, correctAnswer] = yearOnePlanetSevenAnswer(
      fractionWord,
      playerInput
    );
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion7();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  }

  const newQuestion7 = (playerInput) => {
    setNoOfQuestions(noOfQuestions + 1);
    let newFractionWord = getFractionWord();
    setFractionWord(newFractionWord);
    console.log(`right answer${fractionWord} and input${playerInput}`);
    let [correctAnswer, questionResult] = yearOnePlanetSevenAnswer(
      fractionWord,
      playerInput
    );
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // yearOnePlanetEight
  const [Y1P8knownValue, setY1P8knownValue] = useState(0);

  useEffect(() => {
    let Y1P8knownValue = yearOnePlanetEightQuestion();
    setY1P8knownValue(Y1P8knownValue);
  }, []);

  const checkAnswer8 = () => {
    let [questionResult, correctAnswer] = yearOnePlanetEightAnswer(
      Y1P8knownValue,
      answerInput
    );
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
    setNoOfQuestions(noOfQuestions + 1);
    let Y1P8knownValue = yearOnePlanetEightQuestion();
    setY1P8knownValue(Y1P8knownValue);

    let [questionResult, correctAnswer] = yearOnePlanetEightAnswer(
      Y1P8knownValue,
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  const updateScore = async (score, user) => {
    let email = await context.user.email;
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

  if (noOfQuestions === 11) {
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
  } else if (points < 100) {
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion1}
        />
        <PicQuestionCard
          inputType={inputType}
          src={numberLineImg}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          text={"Can you fill in the missing number?"}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer1}
        />
        <Score score={score} />
        <ResourceButton url="https://www.youtube.com/watch?v=e0dJWfQHF8Y" />
      </div>
    );
  } else if (points < 200) {
    console.log("In shapes game");

    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion2}
        />
        <ShapesQuestionCard
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          shape={shape}
          checkAnswer={checkAnswer2}
        />
        <Score score={score} />
        <ResourceButton url="https://www.youtube.com/watch?v=WTeqUejf3D0" />
      </div>
    );
  } else if (points < 300) {
    console.log("In counters game!");
    console.log("points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion3}
        />
        <CountersQuestionCard
          h1={
            "Can you add and subtract the stars to work out the total number?"
          }
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={Y1P3value1}
          operation={Y1P3operation}
          value2={Y1P3value2}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer3}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zwv39j6/articles/zbpbrj6" />
      </div>
    );
  } else if (points < 400) {
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
          inputType={"hidden"}
          h1={"Can you match up your number bonds to 10?"}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={`What do I need to add to ${Y1P4knownValue} to make 10?`}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer4}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zwv39j6/articles/zkd98xs" />
      </div>
    );
  } else if (points < 500) {
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
          h1={"How many sums can you get right?"}
          inputType={inputType}
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
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zwv39j6/articles/ztpmrwx" />
      </div>
    );
  } else if (points < 600) {
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion6}
        />
        <QuestionCard
          h1={"Can you read your numbers from 1 to 10?"}
          inputType={inputType}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={"What is"}
          operation={word}
          value2={"in numbers?"}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer6}
        />
        <Score score={score} />
        <ResourceButton  url="https://www.youtube.com/watch?gl=CO&hl=es-419&context=C38ccb90ADOEgsToPDskLi8_jjTLcMDO7pvUR7WrMl&v=e0dJWfQHF8Y" /> 
      </div>
    );
  } else if (points < 700) {
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion7}
        />
        <FractionsQuestionCard
          h1={"How well do you know your fractions?"}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          fractionWord={fractionWord}
          checkAnswer={checkAnswer7}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/z3rbg82" /> 
      </div>
    );
  } else if (points < 800) {
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
          h1={"Can you match up all your number bonds to 20?"}
          inputType={inputType}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={`What do I need to add to ${Y1P8knownValue} to make 20?`}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer8}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zwv39j6/articles/zx3982p" />
      </div>
    );
  }
}
