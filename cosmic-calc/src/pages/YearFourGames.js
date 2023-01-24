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
import QuestionCardThreeDig from "../components/questioncard/QuestionCardThreeDig";
import QuestionCardFraction from "../components/questioncard/QuestionCardFraction";
import QuestionCardOrder from "../components/questioncard/QuestionCardOrder";
import QuestionCardCompare from "../components/questioncard/QuestionCardCompare";
import QuestionCardColumn from "../components/questioncard/QuestionCardColumn";
import QuestionCardUnit from "../components/questioncard/QuestionCardUnit";
import QuestionCardTimer from "../components/questioncard/QuestionCardTimer";
import QuestionCardRound from "../components/questioncard/QuestionCardRound";

import {
  yearFourPlanetOneQuestion,
  yearFourPlanetOneAnswer,
  yearFourPlanetTwoQuestion,
  yearFourPlanetTwoAnswer,
  yearFourPlanetThreeQuestion,
  yearFourPlanetThreeAnswer,
  yearFourPlanetFourQuestion,
  yearFourPlanetFourAnswer,
  yearFourPlanetFiveQuestion,
  yearFourPlanetFiveAnswer,
  yearFourPlanetSixQuestion,
  yearFourPlanetSixAnswer,
  yearFourPlanetSevenQuestion,
  yearFourPlanetSevenAnswer,
  yearFourPlanetEightQuestion,
  yearFourPlanetEightAnswer,
} from "../components/functions/Year4Functions.js";

const YearFourGames = () => {
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
  let points = 898;
  //let points = context.score;
  console.log(context);

  console.log("Points = ", points);

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

  // Year 4 Planet 1 - "Multiples of 6, 7, 9."
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);

  useEffect(() => {
    let [firstNumber, secondNumber] = yearFourPlanetOneQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
  }, []);

  const checkAnswer1 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetOneAnswer(
      [firstNumber, secondNumber],
      answerInput
    );
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion1();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion1 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [firstNumber, secondNumber] = yearFourPlanetOneQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    let [questionResult, correctAnswer] = yearFourPlanetOneAnswer(
      [firstNumber, secondNumber],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 4 Planet 2 - "Adding and subtracting 1000 from a number.""
  const [firstInt, setFirstInt] = useState(0);
  const [secondInt, setSecondInt] = useState(0);
  const [operation, setOperation] = useState("+");

  useEffect(() => {
    let [firstInt, operation, secondInt] = yearFourPlanetTwoQuestion();
    setFirstInt(firstInt);
    setSecondInt(secondInt);
    setOperation(operation);
  }, []);

  const checkAnswer2 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetTwoAnswer(
      [firstInt, operation, secondInt],
      answerInput
    );
    console.log(firstInt, operation, secondInt, answerInput);
    setAnswerInput("");
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
  };

  const newQuestion2 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [firstInt, operation, secondInt] = yearFourPlanetTwoQuestion();
    setFirstInt(firstInt);
    setSecondInt(secondInt);
    setOperation(operation);
    let [questionResult, correctAnswer] = yearFourPlanetTwoAnswer(
      [firstInt, operation, secondInt],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  //Year 4 Planet 3 - "Basic subtraction into the negative numbers."
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);

  useEffect(() => {
    let [firstNum, secondNum] = yearFourPlanetThreeQuestion();
    setFirstNum(firstNum);
    setSecondNum(secondNum);
  }, []);

  const checkAnswer3 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetThreeAnswer(
      [firstNum, secondNum],
      answerInput
    );
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
    let [firstNum, secondNum] = yearFourPlanetThreeQuestion();
    setFirstNum(firstNum);
    setSecondNum(secondNum);
    let [questionResult, correctAnswer] = yearFourPlanetThreeAnswer(
      [firstNum, secondNum],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 4 Planet 4 - "Sort numbers up to 10,000"
  const [firstNumberOrder, setFirstNumberOrder] = useState(0);
  const [secondNumberOrder, setSecondNumberOrder] = useState(0);
  const [thirdNumberOrder, setThirdNumberOrder] = useState(0);
  const [fourthNumberOrder, setFourthNumberOrder] = useState(0);

  useEffect(() => {
    let [
      firstNumberOrder,
      secondNumberOrder,
      thirdNumberOrder,
      fourthNumberOrder,
    ] = yearFourPlanetFourQuestion();
    setFirstNumberOrder(firstNumberOrder);
    setSecondNumberOrder(secondNumberOrder);
    setThirdNumberOrder(thirdNumberOrder);
    setFourthNumberOrder(fourthNumberOrder);
  }, []);

  const checkAnswer4 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetFourAnswer(
      [
        firstNumberOrder,
        secondNumberOrder,
        thirdNumberOrder,
        fourthNumberOrder,
      ],
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
    setNoOfQuestions(noOfQuestions + 1);
    let [
      firstNumberOrder,
      secondNumberOrder,
      thirdNumberOrder,
      fourthNumberOrder,
    ] = yearFourPlanetFourQuestion();
    setFirstNumberOrder(firstNumberOrder);
    setSecondNumberOrder(secondNumberOrder);
    setThirdNumberOrder(thirdNumberOrder);
    setFourthNumberOrder(fourthNumberOrder);
    let [questionResult, correctAnswer] = yearFourPlanetFourAnswer(
      [
        firstNumberOrder,
        secondNumberOrder,
        thirdNumberOrder,
        fourthNumberOrder,
      ],
      answerInput
    );
    console.log("result", questionResult, correctAnswer);
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };
  // Year 4 Planet 5 - "Round to the nearest 10, 100, or 1000"
  const [firstNumberRound, setFirstNumberRound] = useState(0);
  const [secondNumberRound, setSecondNumberRound] = useState(0);

  useEffect(() => {
    let [firstNumberRound, secondNumberRound] = yearFourPlanetFiveQuestion();
    setFirstNumberRound(firstNumberRound);
    setSecondNumberRound(secondNumberRound);
  }, []);

  const checkAnswer5 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetFiveAnswer(
      [firstNumberRound, secondNumberRound],
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
    let [firstNumberRound, secondNumberRound] = yearFourPlanetFiveQuestion();
    setFirstNumberRound(firstNumberRound);
    setSecondNumberRound(secondNumberRound);
    let [questionResult, correctAnswer] = yearFourPlanetFiveAnswer(
      [firstNumberRound, secondNumberRound],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 4 Planet 6 - "Adding and subtracting measurements and then potentially covert them"
  const [firstMeasurement, setFirstMeasurement] = useState(0);
  const [secondMeasurement, setSecondMeasurement] = useState(0);
  const [operationMeasurement, setOperationMeasurement] = useState("+");
  const [unit, setUnit] = useState("cm");
  const [conversionUnit, setConversionUnit] = useState("cm");

  useEffect(() => {
    let [
      firstMeasurement,
      secondMeasurement,
      operationMeasurement,
      unit,
      conversionUnit,
    ] = yearFourPlanetSixQuestion();
    setFirstMeasurement(firstMeasurement);
    setSecondMeasurement(secondMeasurement);
    setOperationMeasurement(operationMeasurement);
    setUnit(unit);
    setConversionUnit(conversionUnit);
  }, []);

  const checkAnswer6 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetSixAnswer(
      [
        firstMeasurement,
        secondMeasurement,
        operationMeasurement,
        unit,
        conversionUnit,
      ],
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
    let [
      firstMeasurement,
      secondMeasurement,
      operationMeasurement,
      unit,
      conversionUnit,
    ] = yearFourPlanetSixQuestion();
    setFirstMeasurement(firstMeasurement);
    setSecondMeasurement(secondMeasurement);
    setOperationMeasurement(operationMeasurement);
    setUnit(unit);
    setConversionUnit(conversionUnit);
    let [questionResult, correctAnswer] = yearFourPlanetSixAnswer(
      [
        firstMeasurement,
        secondMeasurement,
        operationMeasurement,
        unit,
        conversionUnit,
      ],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 4 Planet 7 - "Multiples of numbers from 0 to 12"
  // Year 4 Planet 9 - "Multiples of numbers from 0 to 12 with a time limit"
  // same input just with the timer card - smart component
  const [firstMultiple1, setFirstMultiple1] = useState(0);
  const [secondMultiple1, setSecondMultiple1] = useState(0);

  useEffect(() => {
    let [firstMultiple1, secondMultiple1] = yearFourPlanetSevenQuestion();
    setFirstMultiple1(firstMultiple1);
    setSecondMultiple1(secondMultiple1);
  }, []);

  const checkAnswer7 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetSevenAnswer(
      [firstMultiple1, secondMultiple1],
      answerInput
    );
    setAnswerInput("");
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
  };

  const newQuestion7 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [firstMultiple1, secondMultiple1] = yearFourPlanetSevenQuestion();
    setFirstMultiple1(firstMultiple1);
    setSecondMultiple1(secondMultiple1);
    let [questionResult, correctAnswer] = yearFourPlanetSevenAnswer(
      [firstMultiple1, secondMultiple1],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 4 Planet 8 - "Multiplying three numbers together"
  const [firstMultiple, setFirstMultiple] = useState(0);
  const [secondMultiple, setSecondMultiple] = useState(0);
  const [thirdMultiple, setThirdMultiple] = useState(0);

  useEffect(() => {
    let [firstMultiple, secondMultiple, thirdMultiple] =
      yearFourPlanetEightQuestion();
    setFirstMultiple(firstMultiple);
    setSecondMultiple(secondMultiple);
    setThirdMultiple(thirdMultiple);
  }, []);

  const checkAnswer8 = () => {
    let [questionResult, correctAnswer] = yearFourPlanetEightAnswer(
      [firstMultiple, secondMultiple, thirdMultiple],
      answerInput
    );
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct");
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
    let [firstMultiple, secondMultiple, thirdMultiple] =
      yearFourPlanetEightQuestion();
    setFirstMultiple(firstMultiple);
    setSecondMultiple(secondMultiple);
    setThirdMultiple(thirdMultiple);
    console.log(firstMultiple, secondMultiple, thirdMultiple);
    let [questionResult, correctAnswer] = yearFourPlanetEightAnswer(
      [firstMultiple, secondMultiple, thirdMultiple],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // posting the score to the database
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
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion1}
          />
          <QuestionCard
            h1="Can you use your multiples of 6, 7 and 9?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstNumber}
            operation={"x"}
            value2={secondNumber}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer1}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 200) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion2}
          />
          <QuestionCard
            h1="Let's practice adding and subtracting using 10, 100 and 1000!"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstInt}
            operation={operation}
            value2={secondInt}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer2}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 300) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion3}
          />
          <QuestionCard
            h1="Let's practice negative numbers!"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstNum}
            operation={"-"}
            value2={secondNum}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer3}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 400) {
    console.log("25 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion4}
        />
        <QuestionCardOrder
          h1="Let's sort these numbers into order!"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={firstNumberOrder}
          value2={secondNumberOrder}
          value3={thirdNumberOrder}
          value4={fourthNumberOrder}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer4}
        />
        <Score score={score} />
      </div>
    );
  } else if (points < 500) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion5}
          />
          <QuestionCardRound
            h1="Can you round nearest 10, 100, or 1000?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstNumberRound}
            value2={secondNumberRound}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer5}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 600) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion6}
          />
          <QuestionCardUnit
            h1="Can you add measurements and convert them into other measurements?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstMeasurement}
            operation={operationMeasurement}
            value2={secondMeasurement}
            unit={conversionUnit}
            equals={"="}
            conversionUnit={unit}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer6}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 700) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion7}
          />
          <QuestionCard
            h1="Can you use all your times tables knowledge to solve these questions?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstMultiple1}
            operation={"x"}
            value2={secondMultiple1}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer7}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 800) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion8}
          />
          <QuestionCardThreeDig
            h1="Can you multiply three numbers together?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstMultiple}
            operation={"x"}
            value2={secondMultiple}
            operation2={"x"}
            value3={thirdMultiple}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer8}
          />
          <Score score={score} />
        </div>
      </div>
    );
  } else if (points < 900) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion7}
          />
          <QuestionCardTimer
            h1="Can you use your 12 times tables to solve these questions within the time?"
            astronaut={astronaut}
            score={score}
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstMultiple1}
            operation={"x"}
            value2={secondMultiple1}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer7}
          />
          <Score score={score} />
        </div>
      </div>
    );
  }
};

export default YearFourGames;
