import randomNumberGenerator from "./rngFunction"

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


