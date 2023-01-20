import randomNumberGenerator from "./rngFunction";


// Year 2 Planet 2 - "Add or subtract in steps of 10 from any number"
export function yearTwoPlanetTwoQuestion() {
    let initialValue = randomNumberGenerator(101);
    let potentialOutcome = initialValue % 10;
    let potentialOutcomeArray = [];
    while (potentialOutcome <= 100) {
        if (potentialOutcome !== initialValue) {
            potentialOutcomeArray.push(potentialOutcome - initialValue);
        }
        potentialOutcome += 10;
    }
    let randomIndex = randomNumberGenerator(potentialOutcomeArray.length);
    let change = potentialOutcomeArray[randomIndex];
    let operation;
    if (change > 0) {
        operation = "+";
    } else {
        operation = "-";
        change = Math.abs(change);
    }
    return [initialValue, operation, change];
}
export function yearTwoPlanetTwoAnswer(values, playerAnswer) {
    if (values[1] === "+") {
        let correctAnswer = values[0] + values[2];
        return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
    } else {
        let correctAnswer = values[0] - values[2];
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
    let playerArray;
    if (playerAnswer.includes(", ")) {
        playerArray = playerAnswer.split(", ").map((x) => {return Number(x);});
    } else if (playerAnswer.includes(",")) {
        playerArray = playerAnswer.split(",").map((x) => {return Number(x);});
    } else if (playerAnswer.includes(" ")) {
        playerArray = playerAnswer.split(" ").map((x) => {return Number(x);});
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


// Year 2 Planet 8 - "Compare numbers (<, =, >)"
export function yearTwoPlanetEightQuestion() {
    let value1 = randomNumberGenerator(21);
    let value2 = randomNumberGenerator(21);
    return [value1, value2];
}
export function yearTwoPlanetEightAnswer(values, playerAnswer) {
    let correctAnswer;
    if (values[0] < values[1]) {
        correctAnswer = "<";
    } else if (values[0] > values[1]) {
        correctAnswer = ">";
    } else {
        correctAnswer = "=";
    }
    return [playerAnswer === correctAnswer, correctAnswer];
}