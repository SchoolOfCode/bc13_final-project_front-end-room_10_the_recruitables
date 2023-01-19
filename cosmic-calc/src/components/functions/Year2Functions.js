import randomNumberGenerator from "./rngFunction";


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


// Year 2 Planet 3 - "See a number as a word, and answer with the number as a number"
export function yearTwoPlanetThreeQuestion() {
    let data = [
      "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];
    const prefixes = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const suffixes = ["", "-one", "-two", "-three", "-four", "-five", "-six", "-seven", "-eight", "-nine"];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 10; j++) {
            data.push(prefixes[i] + suffixes[j]);
        }
    }
    data.push("one hundred");
    let index = randomNumberGenerator(101);
    return [index, data[index]]; // Returns the number in both numerical and word form
}
export function yearTwoPlanetThreeAnswer(values, playerAnswer) {
    return [parseInt(playerAnswer) === values[0], values[0]];
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
    let values = [];
    for (let i = 0; i < 5; i++) {
        let randomNumber = randomNumberGenerator(101);
        while (values.includes(randomNumber)) {
            randomNumber = randomNumberGenerator(101);
        }
        values.push(randomNumber);
    }
    return values;
}
export function yearTwoPlanetSevenAnswer(values, playerAnswer) {
    let sortedValues = values.sort((a, b) => {return a - b});
    for (let i = 0; i < values.length; i++) {
        if (sortedValues[i] !== playerAnswer[i]) {
            return [false, sortedValues];
        }
    }
    return [true, sortedValues];
}


// Year 2 Planet 8 - "Compare numbers (<, =, >)"
export function yearTwoPlanetEightQuestion() {
    let value1 = randomNumberGenerator(21);
    if (Math.random() < (1 / 3)) {
        return [value1, "=", value1];
    } else {
        let value2 = randomNumberGenerator(21);
        while (value1 === value2) {
            value2 = randomNumberGenerator(21);
        }
        if (value1 > value2) {
            return [value1, ">", value2];
        } else {
            return [value1, "<", value2];
        }
    }
}
export function yearTwoPlanetEightAnswer(values, playerAnswer) {
    return [playerAnswer === values[1], values[1]];
}