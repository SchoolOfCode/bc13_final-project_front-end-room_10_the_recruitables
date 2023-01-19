import randomNumberGenerator from "./rngFunction";

// Year 4 Planet 6 - "Adding and subtracting measurements and then potentially covert them"
export function yearThreePlanetEightQuestion() {
    let units = [["m", "cm", "mm"], ["l", "ml"], ["kg", "g"]];
    let unitChoice = randomNumberGenerator(3);
    let questionChoice = randomNumberGenerator(units[unitChoice].length - 1) + 1; // Ensure that m, l, or kg are not picked
    let questionScale = units[unitChoice][questionChoice];
    let answerChoice = Math.max(0, questionChoice - 1 - randomNumberGenerator(2)); // Ensure that mm, ml, or g are not picked
    let answerScale = units[unitChoice][answerChoice];
    let operation = ["+", "-"][randomNumberGenerator(2)];
    let values = [randomNumberGenerator(1000) + 1];
    if (operation === "+") {
        let maxValue2 = 1000 - values[0];
        values.push(randomNumberGenerator(maxValue2) + 1);
    } else {
        values.push(randomNumberGenerator(values[0]) + 1);
    }
    return [values[0], operation, values[1], questionScale, answerScale];
}
export function yearThreePlanetEightAnswer(values, playerAnswer) {
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