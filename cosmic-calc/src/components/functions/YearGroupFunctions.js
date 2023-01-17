// Reusable function to generate a random number from 0 to input - 1
function randomNumberGenerator(num) {
    return Math.floor(Math.random() * num);
}


// Year 1 Planet 4 / Planet 8 - "Number bonds to 10" / "Number bonds to 20"
export function yearOnePlanetFourQuestion(planet) {
    // Randomly choose if doing number bonds to 10 or 20
    let total = 10;
    if (planet === 8) {
        total = 20;
    }
    // Randomly select a number which the user must find the pair of
    let knownValue = randomNumberGenerator(total + 1);
    return [knownValue, total];
}
export function yearOnePlanetFourAnswer(values, playerAnswer) {
    let correctAnswer = values[1] - values[0];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 1 Planet 5 - "Adding and subtracting numbers"
export function yearOnePlanetFiveQuestion() {
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
        values.sort((a, b) => {return b - a})
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


// Year 1 Planet 6 - "Read a number as a word and convert it into a number"
export function yearOnePlanetSixQuestion() {
    const data = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
        "twenty"
    ];
    let index = randomNumberGenerator(21);
    return [index, data[index]]; // Returns the number in both numerical and word form
}
export function yearOnePlanetSixAnswer(values, playerAnswer) {
    let correctAnswer = values[0]
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 2 Planet 2 - "Add or subtract in steps of 10 from any number"
// REWORK SO THAT EDGE CASES (i.e.: 85) DO NOT HAVE A VERY HIGH CHANCE (50%) OF GIVING THE SAME QUESTION (Add 10 to 85 one time)
export function yearTwoPlanetTwoQuestion() {
    let initialValue = randomNumberGenerator(101);
    if (initialValue > 90) {
        // If the initial value is too large to increase, as it will go over 100
        let steps = randomNumberGenerator(9) + 1;
        return [initialValue, "-", steps];

    } else if (initialValue < 10) {
        // If the initial value is too small to decrease, as it will become negative
        let steps = randomNumberGenerator(9) + 1;
        return [initialValue, "+", steps];

    } else {
        // Choose if it will increase or decrease
        let operation;
        let maxSteps;
        if (Math.random() < 0.5) {
            operation = "+";
            maxSteps = 9 - (initialValue - initialValue % 10) / 10;
        } else {
            operation = "-";
            maxSteps = (initialValue - initialValue % 10) / 10;
        }
        let steps = randomNumberGenerator(maxSteps) + 1;
        return [initialValue, operation, steps];
    }
}
export function yearTwoPlanetTwoAnswer(values, playerAnswer) {
    if (values[1] === "+") {
        let correctAnswer = values[0] + 10 * values[2];
        return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
    } else {
        let correctAnswer = values[0] - 10 * values[0];
        return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
    }
}


// Year 2 Planet 5 - "Add together three single-digit numbers"
export function yearTwoPlanetFiveQuestion() {
    let values = [];
    values.push(randomNumberGenerator(9) + 1);
    values.push(10 - values[0]);
    values.push(randomNumberGenerator(9) + 1);

    // Randomly rearrange the values
    let rearrangedValues = [];
    for (let i = 0; i < 3; i++) {
        let maxIndex = values.length;
        let randomIndex = randomNumberGenerator(maxIndex);
        rearrangedValues.push(values[randomIndex]);
        values.splice(randomIndex, 1);
    }
    return rearrangedValues;
}
export function yearTwoPlanetFiveAnswer(values, playerAnswer) {
    let correctAnswer = values[0] + values[1] + values[2];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 2 Planet 6 - "Fractions of numbers"
export function yearTwoPlanetSixQuestion() {
    let denominator = randomNumberGenerator(3) + 2;
    let numerator = randomNumberGenerator(denominator) + 1;
    let otherValue = (randomNumberGenerator(10) + 1) * denominator;
    return [numerator, denominator, otherValue];
}
export function yearTwoPlanetSixAnswer(values, playerAnswer) {
    let correctAnswer = values[2] * values[0] / values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 2 Planet 7 - "Sort a set of numbers into order"
export function yearTwoPlanetSevenQuestion() {

}


function valueChooser(chances) {
    const valuesEasy = [0, 1, 2, 3, 5, 10];
    const valuesMedium = [4, 6, 9, 11];
    const valuesHard = [7, 8, 12];
    const randomDifficulty = Math.random();
    if (randomDifficulty < chances[0]) {
        const randomIndex = randomNumberGenerator(valuesEasy);
        return valuesEasy[randomIndex];
    } else if (randomDifficulty < chances[1]) {
        const randomIndex = randomNumberGenerator(valuesMedium);
        return valuesMedium[randomIndex];
    } else {
        const randomIndex = randomNumberGenerator(valuesHard);
        return valuesHard[randomIndex];
    }
}

export function timesTableAdaptive(rank) {
    let chances;
    if (rank <= 1.75) {
      chances = [0.6, 0.9]; // The first value is the chance of receiving easy values, the second is the chance of receiving easy OR medium values
    } else if (rank < 3.25) {
      chances = [0.3, 0.9];
    } else {
      chances = [0.1, 0.7];
    }
    let chosenValues = [];
    for (let i = 0; i < 2; i++) {
      chosenValues.push(valueChooser(chances));
    }
    return chosenValues;
  }

export function updateRank(rank, correctAnswers) {
    let updatedRank = rank + (correctAnswers - 5) / 10; // Rank will be increased or decreased by up to 0.5 depending on the number of correct answers
    let cappedMin = Math.ceil(updatedRank, 0); // The rank cannot go below 0
    let cappedMax = Math.floor(cappedMin, 5); // The rank cannot go above 5
    return cappedMax;
}

// Begin with previousValues = [[], []];
export function previousQuestions(chosenValues, previousValues) {
    for (let i = 0; i < 2; i++) {
      previousValues[i].unshift(chosenValues[i]);
      if (previousValues[i].length > 2) {
        previousValues[i].pop();
    }
    }
    return previousValues;
}


