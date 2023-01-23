import randomNumberGenerator from "./rngFunction";


// Year 1 Planet 4 - "Number bonds to 10"
export function yearOnePlanetFourQuestion() {
  return randomNumberGenerator(11);
}
export function yearOnePlanetFourAnswer(knownValue, playerAnswer) {
  let correctAnswer = 10 - knownValue;
  return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 1 Planet 5 - "Adding and subtracting numbers"
export function yearOnePlanetFiveQuestion(subtractionTest) {
  // Randomly choose if adding or subtracting
  let operation;
  if (Math.random() < 0.5) {
    operation = "+";
  } else {
    operation = "-";
  }
  if (subtractionTest) {
    operation = "-"; // Solely for testing purposes
  }
  let values = [];
  for (let i = 0; i < 2; i++) {
    let randomInteger = randomNumberGenerator(10) + 1;
    values.push(randomInteger);
  }
  // If subtracting numbers, ensure the largest value is first as to avoid negative numbers
  if (operation === "-") {
    values.sort((a, b) => {
      return b - a;
    });
  }
  return [values[0], operation, values[1]];
}
export function yearOnePlanetFiveAnswer(values, playerAnswer) {
  let correctAnswer;
  if (values[1] === "+") {
    correctAnswer = values[0] + values[2];
  } else {
    correctAnswer = values[0] - values[2];
  }
  return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}

// Year 1 Planet 6 - "See a number as a word, and answer with the number as a number"
export function yearOnePlanetSixQuestion() {
  const data = [
    "zero",
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
  ];
  let index = randomNumberGenerator(21);
  return [index, data[index]]; // Returns the number in both numerical and word form
}
export function yearOnePlanetSixAnswer(values, playerAnswer) {
  return [parseInt(playerAnswer) === values[0], values[0]];
}

// Year 1 Planet 8 - "Number bonds to 20"
export function yearOnePlanetEightQuestion() {
  return randomNumberGenerator(21);
}
export function yearOnePlanetEightAnswer(knownValue, playerAnswer) {
  let correctAnswer = 20 - knownValue;
  return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}