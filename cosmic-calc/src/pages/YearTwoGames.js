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
import randomNumberGenerator from "../components/functions/rngFunction";
import ResourceButton from "../components/questioncard/ResourceButton";

import {
  yearTwoPlanetTwoQuestion,
  yearTwoPlanetTwoAnswer,
  yearTwoPlanetThreeQuestion,
  yearTwoPlanetThreeAnswer,
  yearTwoPlanetFiveQuestion,
  yearTwoPlanetFiveAnswer,
  yearTwoPlanetSixQuestion,
  yearTwoPlanetSixAnswer,
  yearTwoPlanetSevenQuestion,
  yearTwoPlanetSevenAnswer,
  yearTwoPlanetEightQuestion,
  yearTwoPlanetEightAnswer,
} from "../components/functions/Year2Functions";

export default function YearTwoGames() {
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
  let points = 190;
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

  // yearTwoPlanetOne

  const [coinCountingImg, setcoinCountingImg] = useState("");
  const [correctAnswer1, setCorrectAnswer1] = useState(0);
  const [coinCountingArray, setcoinCountingArray] = useState([]);

  useEffect(() => {
    async function getcoinCounting() {
      const response = await fetch(
        `http://localhost:3001/api/mathsQuestions/coinCounting`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.payload) {
        let newcoinCountingArray = data.payload;
        console.log(newcoinCountingArray);
        setcoinCountingArray(data.payload);
        let randomID = randomNumberGenerator(10);
        setcoinCountingImg(newcoinCountingArray[randomID].img_url);
        setCorrectAnswer1(newcoinCountingArray[randomID].answer);
      }
    }
    getcoinCounting();
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
    let randomID = randomNumberGenerator(7);
    setcoinCountingImg(coinCountingArray[randomID].img_url);
    setCorrectAnswer1(coinCountingArray[randomID].answer);
    setResult("");
    setAnswerVisible(false);
  };

  // Year 2 Planet 2 - "Addition"
  const [initialValue, setInitialValue] = useState(0);
  const [operation, setOperation] = useState("+");
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    let [initialValue, operation, steps] = yearTwoPlanetTwoQuestion();
    console.log("initialValue = ", initialValue);
    console.log("operation = ", operation);
    console.log("steps = ", steps);
    setInitialValue(initialValue);
    setOperation(operation);
    setSteps(steps);
  }, []);

  const checkAnswer2 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearTwoPlanetTwoAnswer(
      [initialValue, operation, steps],
      answerInput
    );
    console.log(questionResult, correctAnswer);
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
    let [initialValue, operation, steps] = yearTwoPlanetTwoQuestion();
    console.log("initialValue = ", initialValue);
    console.log("operation = ", operation);
    console.log("steps = ", steps);
    setInitialValue(initialValue);
    setOperation(operation);
    setSteps(steps);
    let [questionResult, correctAnswer] = yearTwoPlanetTwoAnswer(
      [initialValue, operation, steps],
      answerInput
    );
    console.log(questionResult, correctAnswer);
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [initialValue, operation, steps];
  };

  // Year 2 Planet 3 - converting words to numbers
  const [number, setNumber] = useState(0);
  const [word, setWord] = useState("");

  useEffect(() => {
    let [number, word] = yearTwoPlanetThreeQuestion();
    setNumber(number);
    setWord(word);
  }, []);

  const checkAnswer3 = () => {
    console.log("Check answer called");
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearTwoPlanetThreeAnswer(
      [number, word],
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
    let [number, word] = yearTwoPlanetThreeQuestion();
    setNumber(number);
    setWord(word);
    console.log("number = ", number);
    console.log("word = ", word);
    let [questionResult, correctAnswer] = yearTwoPlanetThreeAnswer(
      [number, word],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // yearTwoPlanetFour

  const [placeValueImg, setplaceValueImg] = useState("");
  const [correctAnswer2, setCorrectAnswer2] = useState(0);
  const [placeValueArray, setplaceValueArray] = useState([]);

  useEffect(() => {
    async function getplaceValue() {
      const response = await fetch(
        `http://localhost:3001/api/mathsQuestions/coinsPlaceValue`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.payload) {
        let newplaceValueArray = data.payload;
        console.log(newplaceValueArray);
        setplaceValueArray(data.payload);
        let randomID = randomNumberGenerator(10);
        setplaceValueImg(newplaceValueArray[randomID].img_url);
        setCorrectAnswer2(newplaceValueArray[randomID].answer);
      }
    }
    getplaceValue();
  }, []);

  const checkAnswer4 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let questionResult = "";
    if (correctAnswer2 == answerInput) {
      questionResult = true;
    } else {
      questionResult = false;
    }
    setAnswerInput("");
    if (questionResult === true) {
      playCorrect();
      setResult("Correct!");
      setScore(Number(score) + 1);
      newQuestion4();
    } else {
      playWrong();
      setResult(correctAnswer2);
      setAnswerVisible(true);
    }
  };

  const newQuestion4 = () => {
    let randomID = randomNumberGenerator(7);
    setplaceValueImg(placeValueArray[randomID].img_url);
    setCorrectAnswer2(placeValueArray[randomID].answer);
    setResult("");
    setAnswerVisible(false);
  };

  // Year 2 Planet 5 - "Add together three single-digit numbers"
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [thirdNumber, setThirdNumber] = useState(0);

  useEffect(() => {
    let [firstNumber, secondNumber, thirdNumber] = yearTwoPlanetFiveQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    setThirdNumber(thirdNumber);
    console.log(firstNumber, secondNumber, thirdNumber);
  }, []);

  const checkAnswer5 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearTwoPlanetFiveAnswer(
      [firstNumber, secondNumber, thirdNumber],
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
    let [firstNumber, secondNumber, thirdNumber] = yearTwoPlanetFiveQuestion();
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    setThirdNumber(thirdNumber);
    console.log(firstNumber, secondNumber, thirdNumber);
    let [questionResult, correctAnswer] = yearTwoPlanetFiveAnswer(
      [firstNumber, secondNumber, thirdNumber],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 2 Planet 6 - "Fractions of numbers"
  const [numerator, setNumerator] = useState(0);
  const [denominator, setDenominator] = useState(0);
  const [otherValue, setOtherValue] = useState(0);

  useEffect(() => {
    let [numerator, denominator, otherValue] = yearTwoPlanetSixQuestion();
    setNumerator(numerator);
    setDenominator(denominator);
    setOtherValue(otherValue);
  }, []);

  const checkAnswer6 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearTwoPlanetSixAnswer(
      [numerator, denominator, otherValue],
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
    let [numerator, denominator, otherValue] = yearTwoPlanetSixQuestion();
    setNumerator(numerator);
    setDenominator(denominator);
    setOtherValue(otherValue);
    let [questionResult, correctAnswer] = yearTwoPlanetSixAnswer(
      [numerator, denominator, otherValue],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  // Year 2 Planet 7 - "Sort a set of numbers into order"
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
    ] = yearTwoPlanetSevenQuestion();
    setFirstNumberOrder(firstNumberOrder);
    setSecondNumberOrder(secondNumberOrder);
    setThirdNumberOrder(thirdNumberOrder);
    setFourthNumberOrder(fourthNumberOrder);
  }, []);

  const checkAnswer7 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearTwoPlanetSevenAnswer(
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
      newQuestion7();
    } else {
      playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion7 = () => {
    let [
      firstNumberOrder,
      secondNumberOrder,
      thirdNumberOrder,
      fourthNumberOrder,
    ] = yearTwoPlanetSevenQuestion();
    setFirstNumberOrder(firstNumberOrder);
    setSecondNumberOrder(secondNumberOrder);
    setThirdNumberOrder(thirdNumberOrder);
    setFourthNumberOrder(fourthNumberOrder);
    let [questionResult, correctAnswer] = yearTwoPlanetSevenAnswer(
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

  // Year 2 Planet 8 - "Compare numbers (<, =, >)"
  const [firstNumberCompare, setFirstNumberCompare] = useState(0);
  const [secondNumberCompare, setSecondNumberCompare] = useState(0);

  useEffect(() => {
    let [firstNumberCompare, secondNumberCompare] =
      yearTwoPlanetEightQuestion();
    setFirstNumberCompare(firstNumberCompare);
    setSecondNumberCompare(secondNumberCompare);
  }, []);

  const checkAnswer8 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearTwoPlanetEightAnswer(
      [firstNumberCompare, secondNumberCompare],
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
    let [firstNumberCompare, secondNumberCompare] =
      yearTwoPlanetEightQuestion();
    setFirstNumberCompare(firstNumberCompare);
    setSecondNumberCompare(secondNumberCompare);
    let [questionResult, correctAnswer] = yearTwoPlanetEightAnswer(
      [firstNumberCompare, secondNumberCompare],
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
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion1}
        />
        <PicQuestionCard
          text = "Can you count in 2s, 5s and 10,s from 0?"
          src={coinCountingImg}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={"Which number is missing?"}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer1}
        />
        <Score score={score} />
        <ResourceButton url="https://www.youtube.com/watch?v=8nokRGhevCw" />
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
            h1="Let's practice addition and subtraction!"
            answerInput={answerInput}
            noOfQuestions={noOfQuestions}
            value1={initialValue}
            operation={operation}
            value2={steps}
            equals={"="}
            setAnswerInput={setAnswerInput}
            checkAnswer={checkAnswer2}
          />
          <Score score={score} />
          <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zwv39j6/articles/zkd98xs" />
        </div>
      </div>
    );
  } else if (points < 300) {
    console.log("10 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion3}
        />
        <QuestionCard
          h1="Can you read and write your numbers up to 100?"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={"What is"}
          operation={word}
          value2={"in numbers?"}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer3}
        />
        <Score score={score} />
        <ResourceButton url="https://www.youtube.com/watch?v=bGetqbqDVaA" />
      </div>
    );
  } else if (points < 400) {
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion4}
        />
        <PicQuestionCard
          text = "Can you count up the coins?"
          src={placeValueImg}
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={"Which does this equal?"}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer4}
        />
        <Score score={score} />
        <ResourceButton url="https://www.youtube.com/watch?v=bGetqbqDVaA" />
      </div>
    );
  } else if (points < 500) {
    console.log("15 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion5}
        />
        <QuestionCardThreeDig
          h1="Can you add three numbers together?"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={firstNumber}
          operation={"+"}
          value2={secondNumber}
          operation2={"+"}
          value3={thirdNumber}
          equals={"="}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer5}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/zf72pv4/articles/zr68r2p" />
      </div>
    );
  } else if (points < 600) {
    console.log("20 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion6}
        />
        <QuestionCardFraction
          h1="Can you find the factions of these amounts?"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={numerator}
          value2={denominator}
          value3={otherValue}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer6}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/z3rbg82" />
      </div>
    );
  } else if (points < 700) {
    console.log("25 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion7}
        />
        <QuestionCardOrder
          h1="Can you order these numbers from smallest to largest?"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={firstNumberOrder}
          value2={secondNumberOrder}
          value3={thirdNumberOrder}
          value4={fourthNumberOrder}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer7}
        />
        <Score score={score} />
        <ResourceButton url="https://www.youtube.com/watch?v=bGetqbqDVaA" />
      </div>
    );
  } else if (points < 800) {
    console.log("30 points = ", points);
    return (
      <div className="gameDiv">
        <AnswerCard
          answerVisible={answerVisible}
          result={result}
          newQuestion={newQuestion8}
        />
        <QuestionCardCompare
          h1="Use your crocodiles (> and <)  to compare these numbers!"
          answerInput={answerInput}
          noOfQuestions={noOfQuestions}
          value1={firstNumberCompare}
          value2={secondNumberCompare}
          setAnswerInput={setAnswerInput}
          checkAnswer={checkAnswer8}
        />
        <Score score={score} />
        <ResourceButton url="https://www.bbc.co.uk/bitesize/topics/z8sfr82/articles/z3cm8hv" />
      </div>
    );
  }
}
