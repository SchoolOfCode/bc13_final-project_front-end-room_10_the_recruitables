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
import AnswerCardOrder from "../components/answercard/AnswerCardOrder";
import QuestionCard from "../components/questioncard/QuestionCard";
import ShapesQuestionCard from "../components/shapesQuestionCard/ShapesQuestionCard";
import Score from "../components/score/Score";
import PicQuestionCard from "../components/picQuestionCard/picQuestionCard";
import QuestionCardThreeDig from "../components/questioncard/QuestionCardColumn";
import QuestionCardFraction from "../components/questioncard/QuestionCardFraction";
import QuestionCardOrder from "../components/questioncard/QuestionCardOrder";
import QuestionCardCompare from "../components/questioncard/QuestionCardCompare";
import QuestionCardColumn from "../components/questioncard/QuestionCardColumn";
import QuestionCardUnit from "../components/questioncard/QuestionCardUnit";
import ResourceButton from "../components/questioncard/ResourceButton";

import {
  yearThreePlanetOneQuestion,
  yearThreePlanetOneAnswer,
  yearThreePlanetTwoQuestion,
  yearThreePlanetTwoAnswer,
  yearThreePlanetThreeQuestion,
  yearThreePlanetThreeAnswer,
  yearThreePlanetFourQuestion,
  yearThreePlanetFourAnswer,
  yearThreePlanetFiveQuestion,
  yearThreePlanetFiveAnswer,
  yearThreePlanetEightQuestion,
  yearThreePlanetEightAnswer,
} from "../components/functions/Year3Functions.js";

const YearThreeGames = () => {
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
  //let points = 98;
  let points = context.score;
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

  // Year 3 planet 1 -  "Given a number, add or subtract 1, 10, or 100."
  const [initialValue, setInitialValue] = useState(0);
  const [operation, setOperation] = useState("");
  const [multipleValue, setMultipleValue] = useState(0);

  useEffect(() => {
    let [initialValue, operation, multipleValue] = yearThreePlanetOneQuestion();
    setInitialValue(initialValue);
    setOperation(operation);
    setMultipleValue(multipleValue);
  }, []);

  const checkAnswer1 = () => {
    let [questionResult, correctAnswer] = yearThreePlanetOneAnswer(
      [initialValue, operation, multipleValue],
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
    let [initialValue, operation, multipleValue] = yearThreePlanetOneQuestion();
    setInitialValue(initialValue);
    setOperation(operation);
    setMultipleValue(multipleValue);
    console.log(initialValue, operation, multipleValue);
    let [questionResult, correctAnswer] = yearThreePlanetOneAnswer(
      [initialValue, operation, multipleValue],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    console.log(answerInput, questionResult, correctAnswer);
    return [questionResult, correctAnswer];
  };

  // Year 3 planet 2 - "Given a set of 5 numbers between 0 and 1000 and sort them."
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
    ] = yearThreePlanetTwoQuestion();
    setFirstNumberOrder(firstNumberOrder);
    setSecondNumberOrder(secondNumberOrder);
    setThirdNumberOrder(thirdNumberOrder);
    setFourthNumberOrder(fourthNumberOrder);
  }, []);

  const checkAnswer2 = () => {
    let [questionResult, correctAnswer] = yearThreePlanetTwoAnswer(
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
      newQuestion2();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion2 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [
      firstNumberOrder,
      secondNumberOrder,
      thirdNumberOrder,
      fourthNumberOrder,
    ] = yearThreePlanetTwoQuestion();
    setFirstNumberOrder(firstNumberOrder);
    setSecondNumberOrder(secondNumberOrder);
    setThirdNumberOrder(thirdNumberOrder);
    setFourthNumberOrder(fourthNumberOrder);
    let [questionResult, correctAnswer] = yearThreePlanetTwoAnswer(
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

  // Year 3 planet 3 - "Add together two 3-digit numbers"
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);

  useEffect(() => {
    let [firstNumber, secondNumber] = yearThreePlanetThreeQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
  }, []);

  const checkAnswer3 = () => {
    let [questionResult, correctAnswer] = yearThreePlanetThreeAnswer(
      [firstNumber, secondNumber],
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
    let [firstNumber, secondNumber] = yearThreePlanetThreeQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    let [questionResult, correctAnswer] = yearThreePlanetThreeAnswer(
      [firstNumber, secondNumber],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 3 Planet 4 - "Subtracting numbers with 3-digits"
  const [firstInt, setFirstInt] = useState(0);
  const [secondInt, setSecondInt] = useState(0);

  useEffect(() => {
    let [firstInt, secondInt] = yearThreePlanetFourQuestion();
    setFirstInt(firstInt);
    setSecondInt(secondInt);
  }, []);

  const checkAnswer4 = () => {
    let [questionResult, correctAnswer] = yearThreePlanetFourAnswer(
      [firstInt, secondInt],
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

  const newQuestion4 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [firstNumber, secondNumber] = yearThreePlanetFourQuestion();
    setFirstInt(firstNumber);
    setSecondInt(secondNumber);
    let [questionResult, correctAnswer] = yearThreePlanetFourAnswer(
      [firstInt, secondInt],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 3 Planet 5 - "Multiples of 2, 3, 4, 5, 8, 10."
  const [firstMultiple, setFirstMultiple] = useState(0);
  const [secondMultiple, setSecondMultiple] = useState(0);

  useEffect(() => {
    let [firstMultiple, secondMultiple] = yearThreePlanetFiveQuestion();
    setFirstMultiple(firstMultiple);
    setSecondMultiple(secondMultiple);
  }, []);

  const checkAnswer5 = () => {
    let [questionResult, correctAnswer] = yearThreePlanetFiveAnswer(
      [firstMultiple, secondMultiple],
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
    let [firstMultiple, secondMultiple] = yearThreePlanetFiveQuestion();
    setFirstMultiple(firstMultiple);
    setSecondMultiple(secondMultiple);
    let [questionResult, correctAnswer] = yearThreePlanetFiveAnswer(
      [firstMultiple, secondMultiple],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 3 Planet 8 - "Adding and subtracting measurements"
  const [firstMeasurement, setFirstMeasurement] = useState(0);
  const [secondMeasurement, setSecondMeasurement] = useState(0);
  const [operationMeasurement, setOperationMeasurement] = useState("+");
  const [unit, setUnit] = useState("cm");

  useEffect(() => {
    let [firstMeasurement, secondMeasurement, operationMeasurement, unit] =
      yearThreePlanetEightQuestion();
    setFirstMeasurement(firstMeasurement);
    setSecondMeasurement(secondMeasurement);
    setOperationMeasurement(operationMeasurement);
    setUnit(unit);
  }, []);

  const checkAnswer8 = () => {
    let [questionResult, correctAnswer] = yearThreePlanetEightAnswer(
      [firstMeasurement, secondMeasurement, operationMeasurement, unit],
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
    let [firstMeasurement, secondMeasurement, operationMeasurement, unit] =
      yearThreePlanetEightQuestion();
    setFirstMeasurement(firstMeasurement);
    setSecondMeasurement(secondMeasurement);
    setOperationMeasurement(operationMeasurement);
    setUnit(unit);
    let [questionResult, correctAnswer] = yearThreePlanetEightAnswer(
      [firstMeasurement, secondMeasurement, operationMeasurement, unit],
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
            h1="Can you add or subtract 1, 10, or 100?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={initialValue}
            operation={operation}
            value2={multipleValue}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer1}
          />
          <Score score={score} />
          <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zy2mn39/articles/z7kw4xs" />
        </div>
      </div>
    );
  } else if (points < 200) {
    console.log("25 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCardOrder
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion2}
        />
        <QuestionCardOrder
          h1="Can you put these numbers in the right order?"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={firstNumberOrder}
          value2={secondNumberOrder}
          value3={thirdNumberOrder}
          value4={fourthNumberOrder}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer2}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zknsgk7/articles/z2pjwxs" />
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
          <QuestionCardColumn
            h1="Can you add these three-digit numbers?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstNumber}
            operation={"+"}
            value2={secondNumber}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer3}
          />
          <Score score={score} />
          <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zy2mn39/articles/zvxxt39" />
        </div>
      </div>
    );
  } else if (points < 400) {
    return (
      <div>
        <div className="gameDiv">
          <AnswerCard
            answerVisible={answerVisible}
            result={result}
            newQuestion={newQuestion4}
          />
          <QuestionCardColumn
            h1="Can you subtract using two- and three-digit numbers?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstInt}
            operation={"-"}
            value2={secondInt}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer4}
          />
          <Score score={score} />
          <ResourceButton url="https://www.youtube.com/watch?v=L3ANvTHKf7U" />
        </div>
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
          <QuestionCard
            h1="Can you use your times tables skills to solve these problems?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstMultiple}
            operation={"x"}
            value2={secondMultiple}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer5}
          />
          <Score score={score} />
          <ResourceButton url="https://www.bbc.co.uk/teach/supermovers/ks2-maths-the-3-times-table/z6sw382" />
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
            newQuestion={newQuestion8}
          />
          <QuestionCardUnit
            h1="Can you add and subtract using units of measurement?"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={firstMeasurement}
            operation={operationMeasurement}
            value2={secondMeasurement}
            unit={unit}
            equals={"="}
            conversionUnit={unit}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer8}
          />
          <Score score={score} />
          <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/z9sfr82/articles/z7mwr2p" />
        </div>
      </div>
    );
  }
};

export default YearThreeGames;
