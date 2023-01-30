export default function newQuestion(props) {
    props.setNoOfQuestions(props.noOfQuestions + 1);
    let [value1, operation, value2] = props.functionQuestion();
    props.setValue1(value1);
    props.setValue2(value2);
    props.setOperation(operation);
    let [questionResult, correctAnswer] = props.functionAnswer(
      [value1, operation, value2],
      props.answerInput
    );
    props.setAnswerInput("");
    props.setResult("");
    props.setAnswerVisible(false);
    return [questionResult, correctAnswer];
  };
