import randomNumberGenerator from "./rngFunction";


// Year 3 Planet 1 - "Given a number, add or subtract 1, 10, or 100."
export function yearThreePlanetOneQuestion() {
    let initialValue = randomNumberGenerator(801) + 100; // Generates a number from 100 to 900
    let placeValueDecider = randomNumberGenerator(3);
    let change = 10 ** placeValueDecider;
    if (Math.random() < 0.5) {
        return [initialValue, "-", change];
    } else {
        return [initialValue, "+", change];
    }
}
export function yearThreePlanetOneAnswer(values, playerAnswer) {
    let correctAnswer;
    if (values[1] === "-") {
        correctAnswer = values[0] - values[2];
    } else {
        correctAnswer = values[0] + values[2];
    }
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 3 Planet 2 - "Given a set of 5 numbers between 0 and 1000 and sort them."
export function yearThreePlanetTwoQuestion() {
    let values = [];
    for (let i = 0; i < 5; i++) {
        let randomNumber = randomNumberGenerator(1001);
        while (values.includes(randomNumber)) {
            randomNumber = randomNumberGenerator(1001);
        }
        values.push(randomNumber);
    }
    return values;
}
export function yearThreePlanetTwoAnswer(values, playerAnswer) {
    let sortedValues = values.sort((a, b) => {return a - b});
    let playerArray;
    if (playerAnswer.includes(", ")) {
        playerArray = playerAnswer.split(", ").map((x) => {return Number(x)});
    } else if (playerAnswer.includes(",")) {
        playerArray = playerAnswer.split(",").map((x) => {return Number(x)});
    } else if (playerAnswer.includes(" ")) {
        playerArray = playerAnswer.split(" ").map((x) => {return Number(x)});
    } else {
        return [false, sortedValues]; // If the user does not consistently split their values
    }
    for (let i = 0; i < values.length; i++) {
        if (sortedValues[i] !== playerArray[i]) {
            return [false, sortedValues];
        }
    }
    return [true, sortedValues];
}


// Year 3 Planet 3 - "Add together two 3-digit numbers"
export function yearThreePlanetThreeQuestion() {
    let values = [];
    for (let i = 0; i < 2; i++) {
        values.push(randomNumberGenerator(401) + 100); // Generate a random number between 100 and 500
    }
    return values;
}
export function yearThreePlanetThreeAnswer(values, playerAnswer) {
    let correctAnswer = values[0] + values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 3 Planet 4 - "Subtracting numbers with 3-digits"
export function yearThreePlanetFourQuestion() {
    let value1 = randomNumberGenerator(901) + 100;
    let value2 = randomNumberGenerator(value1) + 1;
    return [value1, value2];
}
export function yearThreePlanetFourAnswer(values, playerAnswer) {
    let correctAnswer = values[0] - values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 3 Planet 5 - "Multiples of 2, 3, 4, 5, 8, 10."
export function yearThreePlanetFiveQuestion() {
    let values = [];
    values.push(randomNumberGenerator(12) + 1);
    const numArr = [2, 3, 4, 5, 8, 10];
    values.push(numArr[randomNumberGenerator(numArr.length)]);
    if (Math.random() < 0.5) {
        return values;
    } else {
        return values.reverse();
    }
}
export function yearThreePlanetFiveAnswer(values, playerAnswer) {
    let correctAnswer = values[0] * values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 3 Planet 8 - "Adding and subtracting measurements"
export function yearThreePlanetEightQuestion(negativeTest) {
    let unitsPossible = ["m", "cm", "mm", "l", "ml", "kg", "g"];
    let unitsQuestion = unitsPossible[randomNumberGenerator(7)];
    let operation = ["+", "-"][randomNumberGenerator(2)];
    if (negativeTest) {
        operation = "-";
    }
    let values = [randomNumberGenerator(1000) + 1];
    if (operation === "+") {
        let maxValue2 = 1000 - values[0];
        values.push(randomNumberGenerator(maxValue2) + 1);
    } else {
        values.push(randomNumberGenerator(values[0]) + 1);
    }
    return [values[0], operation, values[1], unitsQuestion];
}
export function yearThreePlanetEightAnswer(values, playerAnswer) {
    let correctAnswer;
    if (values[1] === "+") {
        correctAnswer = values[0] + values[2];
    } else {
        correctAnswer = values[0] - values[2];
    }
    return [Number(playerAnswer) === correctAnswer, correctAnswer];
}