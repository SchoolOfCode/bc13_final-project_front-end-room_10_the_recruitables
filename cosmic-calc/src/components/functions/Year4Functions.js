import randomNumberGenerator from "./rngFunction";


// Year 4 Planet 1 - "Multiples of 6, 7, 9."
export function yearFourPlanetOneQuestion() {
    let values = [];
    values.push(randomNumberGenerator(12) + 1);
    const numArr = [6, 7, 9];
    values.push(numArr[randomNumberGenerator(numArr.length)]);
    if (Math.random() < 0.5) {
        return values;
    } else {
        return values.reverse();
    }
}
export function yearFourPlanetOneAnswer(values, playerAnswer) {
    let correctAnswer = values[0] * values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 4 Planet 2 - "Adding and subtracting 1000 from a number.""
export function yearFourPlanetTwoQuestion() {
    let initialValue = randomNumberGenerator(8001) + 1000; // Generates a number from 1000 to 9000
    let placeValueDecider = randomNumberGenerator(4);
    let change = 10 ** placeValueDecider;
    if (Math.random() < 0.5) {
        return [initialValue, "-", change];
    } else {
        return [initialValue, "+", change];
    }
}
export function yearFourPlanetTwoAnswer(values, playerAnswer) {
    let correctAnswer;
    if (values[1] === "-") {
        correctAnswer = values[0] - values[2];
    } else {
        correctAnswer = values[0] + values[2];
    }
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


//Year 4 Planet 3 - "Basic subtraction into the negative numbers."
export function yearFourPlanetThreeQuestion() {
    let value1 = randomNumberGenerator(11);                 // 0 to 10
    let value2 = randomNumberGenerator(10) + value1 + 1;    // 1 to 20
    return [value1, value2];
}

export function yearFourPlanetThreeAnswer(values, playerAnswer) {
    let correctAnswer = values[0] - values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 4 Planet 4 - "Sort numbers up to 10,000"
export function yearFourPlanetFourQuestion() {
    let values = [];
    for (let i = 0; i < 5; i++) {
        let randomNumber = randomNumberGenerator(10001);
        while (values.includes(randomNumber)) {
            randomNumber = randomNumberGenerator(10001);
        }
        values.push(randomNumber);
    }
    return values;
}
export function yearFourPlanetFourAnswer(values, playerAnswer) {
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


// Year 4 Planet 5 - "Round to the nearest 10, 100, or 1000"
export function yearFourPlanetFiveQuestion() {
    let initialValue = randomNumberGenerator(1000) * 10 + randomNumberGenerator(9) + 1; // Generates a random number from 1 to 9999 which does not end in a zero
    let roundPower = randomNumberGenerator(3) + 1;
    let roundToNearest = 10 ** roundPower;
    return [initialValue, roundToNearest];
}
export function yearFourPlanetFiveAnswer(values, playerAnswer) {
    let decimalToRound = values[0] / values[1];
    let nearestInteger = Math.round(decimalToRound);
    let correctAnswer = nearestInteger * values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 4 Planet 6 - "Adding and subtracting measurements and then potentially covert them"
export function yearFourPlanetSixQuestion(negativeTest) {
    let units = [["m", "cm", "mm"], ["l", "ml"], ["kg", "g"]];
    let unitChoice = randomNumberGenerator(3);
    let questionChoice = randomNumberGenerator(units[unitChoice].length - 1) + 1; // Ensure that m, l, or kg are not picked
    let questionScale = units[unitChoice][questionChoice];
    let answerChoice = Math.max(0, questionChoice - 1 - randomNumberGenerator(2)); // Ensure that mm, ml, or g are not picked
    let answerScale = units[unitChoice][answerChoice];
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
    return [values[0], operation, values[1], questionScale, answerScale];
}
export function yearFourPlanetSixAnswer(values, playerAnswer) {
    let totalOriginalScale;
    if (values[1] === "+") {
        totalOriginalScale = values[0] + values[2];
    } else {
        totalOriginalScale = values[0] - values[2];
    }
    let correctAnswer = totalOriginalScale;
    if ((values[3] === "mm" && values[4] === "m") || (values[3] === "ml" && values[4] === "l") || (values[3] === "g" && values[4] === "kg")) {
        correctAnswer *= 1000;
    } else {
        correctAnswer *= 100;
    }
    return [Number(playerAnswer) === correctAnswer, correctAnswer];
}

// Year 4 Planet 7 - "Multiples of numbers from 0 to 12"
// Year 4 Planet 9 - "Multiples of numbers from 0 to 12 with a time limit"
export function yearFourPlanetSevenQuestion() {
    let value1 = randomNumberGenerator(13);
    let value2 = randomNumberGenerator(13);
    return [value1, value2];
}
export function yearFourPlanetSevenAnswer(values, playerAnswer) {
    let correctAnswer = values[0] * values[1];
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}


// Year 4 Planet 8 - "Multiplying three numbers together"
export function yearFourPlanetEightQuestion() {
    let values = [];
    for (let i = 0; i < 3; i++) {
        values.push(randomNumberGenerator(11))
    }
    return values;
}
export function yearFourPlanetEightAnswer(values, playerAnswer) {
    let correctAnswer = values.reduce((a, b) => a * b );
    return [parseInt(playerAnswer) === correctAnswer, correctAnswer];
}