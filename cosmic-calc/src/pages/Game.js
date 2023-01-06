import React, { useState } from "react";
import QuestionCard from "../components/questioncard/QuestionCard";
import AnswerCard from "../components/answercard/AnswerCard";
import AnswerInput from "../components/input/AnswerInput";

import {
  timesTableCalculator,
  multiply,
  checkAnswer,
} from "../components/functions/Functions";

export default function Game() {
  const [questionValueArray, setQuestionValueArray] = useState([]);
  const [answerInput, setAnswerInput] = useState();
  const [answerVisible, setAnswerVisible] = useState(false);
  const [answer, setAnswer] = useState();

  const newQuestionValues = timesTableCalculator(12);

  console.log(`newQuestionValues=${newQuestionValues}`);
  // function handleClick() {
  //   setQuestionValueArray(newQuestionValues);
  // }

  const answerValue = multiply(newQuestionValues);
  console.log(`answerValue=${answerValue}`);

  function onChangeInput(e) {
    const answerInputNumber = Number(e.target.value);
    console.log(answerInputNumber);
    return answerInputNumber;
  }

  function handleNextQuestion(answerInputNumber) {
    setAnswerVisible(false);
    timesTableCalculator(12);
    setAnswerInput(answerInputNumber);
  }

  function handleSubmitClick() {
    timeout(100000);
    setAnswer(answerValue);
    console.log("this is answer", answer);
    setAnswerVisible(!answerVisible);
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  return (
    <div>
      <div>
        <QuestionCard questionValues={newQuestionValues} />
        <AnswerInput onChange={onChangeInput} />
        {/* {answerVisible === false && (
          <button onClick={() => handleSubmitClick()}>Submit Answer</button>
        )}
        {answerVisible === true && (
          <button onClick={handleNextQuestion}>Next Question</button>
        )}
      </div> */}
        <button onClick={() => handleSubmitClick()}>Submit Answer</button>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
      {answerVisible === true && (
        <div>
          <AnswerCard answer={answer} answerVisible={answerVisible} />
        </div>
      )}
    </div>
  );
}
