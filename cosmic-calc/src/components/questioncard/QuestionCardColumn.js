import React, { useState, useEffect } from "react";
import "./questionCardColumn.css";

export default function QuestionCardColumn(props) {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [operation, setOperation] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState("");
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    let [value1, operation, value2] = props.functionQuestion();
    setValue1(value1);
    setOperation(operation);
    setValue2(value2);
  }, []);

  const checkAnswer = () => {
    let [questionResult, correctAnswer] = props.functionAnswer(
      [value1, operation, value2],
      answerInput
    );
    setAnswerInput("");
    if (questionResult === true) {
      props.playCorrect();
      setResult("Correct!");
      props.setScore(Number(props.score) + 1);
      newQuestion();
    } else {
      props.playWrong();
      setResult(correctAnswer);
      setAnswerVisible(true);
    }
  };

  const newQuestion = () => {
    props.setNoOfQuestions(props.noOfQuestions + 1);
    let [value1, operation, value2] = props.functionQuestion();
    setValue1(value1);
    setValue2(value2);
    setOperation(operation);
    let [questionResult, correctAnswer] = props.functionAnswer(
      [value1, operation, value2],
      answerInput
    );
    setAnswerInput("");
    setResult("");
    setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };

  return (
    <div className="questionDiv">
      <div className="h1-div">
        <h1> {props.h1}</h1>
      </div>
      <div className="QandA">
        <h2 className="h2QuestionGame">{props.noOfQuestions + ")  "}</h2>
        <div className="numbersColumn">
          <div className="negativeMargins">
            <h2 className="h2QuestionGame">{props.value1}</h2>
          </div>
          <div className="negativeMargins">
            <h2 className="h2QuestionGame">
              {props.operation}
              {"  "}
              {props.value2}
            </h2>
          </div>
        </div>
        <input
          className="inputGame"
          type="number"
          value={props.answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          onKeyDown={(e) => {
            // console.log(e);
            if (e.key === "Enter") {
              checkAnswer();
              setAnswerInput("");
            }
          }}
        />
      </div>
    </div>
  );
}
