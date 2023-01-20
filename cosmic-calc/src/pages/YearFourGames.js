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
import QuestionCardThreeDig from "../components/questioncard/QuestionCardColumn";
import QuestionCardFraction from "../components/questioncard/QuestionCardFraction";
import QuestionCardOrder from "../components/questioncard/QuestionCardOrder";
import QuestionCardCompare from "../components/questioncard/QuestionCardCompare";
import QuestionCardColumn from "../components/questioncard/QuestionCardColumn";
import QuestionCardUnit from "../components/questioncard/QuestionCardUnit";


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
    yearFourPlanetEightAnswer
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
    let points = 40;
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

    // Year 4 Planet 1 - "Multiples of 6, 7, 9."
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    
    useEffect(() => {
        let [firstNumber, secondNumber] = yearFourPlanetOneQuestion();
        setFirstNumber(firstNumber);
        setSecondNumber(secondNumber);
      }, []);
      
      const checkAnswer1 = () => {
        setNoOfQuestions(noOfQuestions + 1);
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
      }
      
      const newQuestion1 = () => {
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
      }

// Year 4 Planet 2 - "Adding and subtracting 1000 from a number.""
const [firstInt, setFirstInt] = useState(0);
const [secondInt, setSecondInt] = useState(0);
const [operation, setOperation] = useState("+");



useEffect(() => {
    let [firstInt, secondInt, operation] = yearFourPlanetTwoQuestion();
    setFirstInt(firstInt);
    setSecondInt(secondInt);
    setOperation(operation);
  }, []);
  
  const checkAnswer2 = () => {
    setNoOfQuestions(noOfQuestions + 1);
    let [questionResult, correctAnswer] = yearFourPlanetTwoQuestion(
      [firstInt, secondInt, operation],
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
  }
  
  const newQuestion2 = () => {
    let [firstInt, secondInt, operation] = yearFourPlanetTwoQuestion();
    setFirstInt(firstInt);
    setSecondInt(secondInt);
    setOperation(operation);
    let [questionResult, correctAnswer] = yearFourPlanetTwoAnswer(
      [firstInt, secondInt, operation],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  }

    //Year 4 Planet 3 - "Basic subtraction into the negative numbers."
    const [firstNum, setFirstNum] = useState(0);
    const [secondNum, setSecondNum] = useState(0);

useEffect(() => {
    let [firstNum, secondNum] = yearFourPlanetThreeQuestion();
    setFirstNum(firstNum);
    setSecondNum(secondNum);
    }, []);

    const checkAnswer3 = () => {
    setNoOfQuestions(noOfQuestions + 1);
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
    }

    const newQuestion3 = () => {
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
    }

    // Year 4 Planet 4 - "Sort numbers up to 10,000"

    // Year 4 Planet 5 - "Round to the nearest 10, 100, or 1000"

    // Year 4 Planet 6 - "Adding and subtracting measurements and then potentially covert them"
    const [firstMeasurement, setFirstMeasurement] = useState(0);
    const [secondMeasurement, setSecondMeasurement] = useState(0);
    const [operationMeasurement, setOperationMeasurement] = useState("+");
    const [unit, setUnit] = useState("cm");
    const [conversionUnit, setConversionUnit] = useState("cm");
    
    
    useEffect(() => {
        let [firstMeasurement, secondMeasurement, operationMeasurement, unit, conversionUnit] = yearFourPlanetSixQuestion();
        setFirstMeasurement(firstMeasurement);
        setSecondMeasurement(secondMeasurement);
        setOperationMeasurement(operationMeasurement);
        setUnit(unit);
        setConversionUnit(conversionUnit);
      }, []);
      
      const checkAnswer6 = () => {
        setNoOfQuestions(noOfQuestions + 1);
        let [questionResult, correctAnswer] = yearFourPlanetSixAnswer(
          [firstMeasurement, secondMeasurement, operationMeasurement, unit, conversionUnit],
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
      }
      
      const newQuestion6 = () => {
        let [firstMeasurement, secondMeasurement, operationMeasurement, unit, conversionUnit] = yearFourPlanetSixQuestion();
        setFirstMeasurement(firstMeasurement);
        setSecondMeasurement(secondMeasurement);
        setOperationMeasurement(operationMeasurement);
        setUnit(unit);
        setConversionUnit(conversionUnit);
        let [questionResult, correctAnswer] = yearFourPlanetSixAnswer(
          [firstMeasurement, secondMeasurement, operationMeasurement, unit, conversionUnit],
          answerInput
        );
        setAnswerInput("");
        setResult("");
        setAnswerVisible(false);
        return [questionResult, correctAnswer];
      }
    
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
    setNoOfQuestions(noOfQuestions + 1);
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
    }

    const newQuestion7 = () => {
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
    }

    // Year 4 Planet 8 - "Multiplying three numbers together"
    const [firstMultiple, setFirstMultiple] = useState(0);
    const [secondMultiple, setSecondMultiple] = useState(0);
    const [thirdMultiple, setThirdMultiple] = useState(0);

    useEffect(() => {
        let [firstMultiple, secondMultiple, thirdMultiple] = yearFourPlanetEightQuestion();
        setFirstMultiple(firstMultiple);
        setSecondMultiple(secondMultiple);
        setThirdMultiple(thirdMultiple);
        }, []);

        const checkAnswer8 = () => {
        setNoOfQuestions(noOfQuestions + 1);
        let [questionResult, correctAnswer] = yearFourPlanetEightAnswer(
            [firstMultiple, secondMultiple, thirdMultiple],
            answerInput
        );
        setAnswerInput("");
        if (questionResult === true) {
            playCorrect();
            setResult("Correct")
            setScore(Number(score) + 1);
            newQuestion8();
        } else {
            playWrong();    
            setResult(correctAnswer);
            setAnswerVisible(true);
        }
        }

        const newQuestion8 = () => {
        let [firstMultiple, secondMultiple, thirdMultiple] = yearFourPlanetEightQuestion();
        setFirstMultiple(firstMultiple);
        setSecondMultiple(secondMultiple);
        setThirdMultiple(thirdMultiple);
        let [questionResult, correctAnswer] = yearFourPlanetEightAnswer(
            [firstMultiple, secondMultiple, thirdMultiple],
            answerInput
        );
        setAnswerInput("");
        setResult("");
        setAnswerVisible(false);
        return [questionResult, correctAnswer];
        }


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
        <div>
          <div className="gameDiv">
            <AnswerCard
              answerVisible={answerVisible}
              result={result}
              newQuestion={newQuestion1}
            />
            <QuestionCard
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
    } else if (points === 10) {
      return (
        <div>
          <div className="gameDiv">
            <AnswerCard
              answerVisible={answerVisible}
              result={result}
              newQuestion={newQuestion2}
            />
            <QuestionCard
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
    } else if (points === 15) {
        return (
            <div>
            <div className="gameDiv">
                <AnswerCard
                answerVisible={answerVisible}
                result={result}
                newQuestion={newQuestion3}
                />
                <QuestionCard
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
        } else if (points === 30) {
            return (
              <div>
                <div className="gameDiv">
                  <AnswerCard
                    answerVisible={answerVisible}
                    result={result}
                    newQuestion={newQuestion6}
                  />
                  <QuestionCardUnit
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
          } else if (points === 35) {
            return (
              <div>
                <div className="gameDiv">
                  <AnswerCard
                    answerVisible={answerVisible}
                    result={result}
                    newQuestion={newQuestion7}
                  />
                  <QuestionCard
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
          } else if (points === 40) {
            return (
                <div>
                  <div className="gameDiv">
                  <AnswerCard
                    answerVisible={answerVisible}
                    result={result}
                    newQuestion={newQuestion8}
                  />
                    <QuestionCardThreeDig
                        answerInput={answerInput}
                        noOfQuestions={noOfQuestions}
                        value1={firstMultiple}
                        operation={"x"}
                        value2={secondMultiple}
                        value3={thirdMultiple}
                        equals={"="}
                        setAnswerInput={setAnswerInput}
                        checkAnswer={checkAnswer8}
                    />
                  <Score score={score} />
                </div>
              </div>
            );
                


}
}

export default YearFourGames