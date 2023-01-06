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

  function handleSubmitAnswer(answerInputNumber) {
    setAnswerVisible(true);
  }

  function handleNextQuestion(answerInputNumber) {
    setAnswerVisible(false);
    timesTableCalculator(12);
    setAnswerInput(answerInputNumber);
  }

  return (
    <div>
      <div>
        <QuestionCard questionValues={newQuestionValues} />
        <AnswerInput onChange={onChangeInput} />
        {answerVisible === false && (
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        )}
        {answerVisible === true && (
          <button onClick={handleNextQuestion}>Next Question</button>
        )}
      </div>
      {answerVisible === true && (
        <div>
          <AnswerCard answerValue={answerValue} answerVisible={answerVisible} />
        </div>
      )}
    </div>
  );
}
