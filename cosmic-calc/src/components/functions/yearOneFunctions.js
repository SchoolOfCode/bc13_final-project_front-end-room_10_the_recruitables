// Reusable function to generate a random number from 0 to (input-1)
export function randomNumberGenerator(num) {
  return Math.floor(Math.random() * num);
}

// Year 1 Planet 5 - "Adding and subtracting numbers"
export function yearOnePlanetFive() {
  // Randomly choose if adding or subtracting
  let operation;
  if (Math.random() < 0.5) {
    operation = "+";
  } else {
    operation = "-";
  }

  let values = [];
  for (let i = 0; i < 2; i++) {
    let randomInteger = randomNumberGenerator(10) + 1;
    values.push(randomInteger);
  }

  // If subtracting numbers, ensure the largest value is first as to avoid
  // negative numbers
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
  return [correctAnswer === playerAnswer, correctAnswer];
}
