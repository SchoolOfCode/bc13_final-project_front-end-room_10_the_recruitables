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
    for (let i = 0; i < values.length; i++) {
        if (sortedValues[i] !== playerAnswer[i]) {
            return [false, sortedValues];
        }
    }
    return [true, sortedValues];
}


// Year 3 Planet 3 - "Add together two 3-digit numbers"
export function yearThreePlanetThreeQuestion() {
    let values = [];
    for (let i = 0; i < 2; i++) {
        values.push(randomNumberGenerator(401) + 100);
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