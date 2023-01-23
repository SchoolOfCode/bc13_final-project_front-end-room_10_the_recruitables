import randomNumberGenerator from "./rngFunction";
import {
    yearOnePlanetFourQuestion,
    yearOnePlanetFourAnswer,
    yearOnePlanetFiveQuestion,
    yearOnePlanetFiveAnswer,
    yearOnePlanetSixQuestion,
    yearOnePlanetSixAnswer,
    yearOnePlanetEightQuestion,
    yearOnePlanetEightAnswer
} from "./Year1Functions";
import {
    yearTwoPlanetTwoQuestion,
    yearTwoPlanetTwoAnswer,
    yearTwoPlanetThreeQuestion,
    yearTwoPlanetThreeAnswer,
    yearTwoPlanetFiveQuestion,
    yearTwoPlanetFiveAnswer,
    yearTwoPlanetSixQuestion,
    yearTwoPlanetSixAnswer,
    yearTwoPlanetSevenQuestion,
    yearTwoPlanetSevenAnswer,
    yearTwoPlanetEightQuestion,
    yearTwoPlanetEightAnswer
} from "./Year2Functions";
import {
    yearThreePlanetOneQuestion,
    yearThreePlanetOneAnswer,
    yearThreePlanetTwoQuestion,
    yearThreePlanetTwoAnswer,
    yearThreePlanetThreeQuestion,
    yearThreePlanetThreeAnswer,
    yearThreePlanetFourQuestion,
    yearThreePlanetFourAnswer,
    yearThreePlanetFiveQuestion,
    yearThreePlanetFiveAnswer,
    yearThreePlanetEightQuestion,
    yearThreePlanetEightAnswer
} from "./Year3Functions";
import {
    yearFourPlanetOneQuestion,
    yearFourPlanetOneAnswer,
    yearFourPlanetTwoQuestion,
    yearFourPlanetTwoAnswer,
    yearFourPlanetThreeQuestion,
    yearFourPlanetThreeAnswer,
    yearFourPlanetFourQuestion,
    yearFourPlanetFourAnswer,
    yearFourPlanetFiveQuestion,
    yearFourPlanetFiveAnswer,
    yearFourPlanetSixQuestion,
    yearFourPlanetSixAnswer,
    yearFourPlanetSevenQuestion,
    yearFourPlanetSevenAnswer,
    yearFourPlanetEightQuestion,
    yearFourPlanetEightAnswer
} from "./Year4Functions";

export function question(yearNumber, planetNumber) {
    switch(yearNumber) {
        case 1:
            switch(planetNumber) {
                case 4:
                    return yearOnePlanetFourQuestion();
                case 5:
                    return yearOnePlanetFiveQuestion();
                case 6:
                    return yearOnePlanetSixQuestion();
                case 8:
                    return yearOnePlanetEightQuestion();
                case 9:
                    let choiceArray = [4, 5, 6, 8];
                    let randomIndex = randomNumberGenerator(choiceArray.length);
                    return question(1, choiceArray[randomIndex]);
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 1.`);
            }
        case 2:
            switch(planetNumber) {
                case 2:
                    return yearTwoPlanetTwoQuestion();
                case 3:
                    return yearTwoPlanetThreeQuestion();
                case 5:
                    return yearTwoPlanetFiveQuestion();
                case 6:
                    return yearTwoPlanetSixQuestion();
                case 7:
                    return yearTwoPlanetSevenQuestion();
                case 8:
                    return yearTwoPlanetEightQuestion();
                case 9:
                    let choiceArray = [2, 3, 5, 6, 7, 8];
                    let randomIndex = randomNumberGenerator(choiceArray.length);
                    return question(1, choiceArray[randomIndex]);
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 2.`);
            }
        case 3:
            switch(planetNumber) {
                case 1:
                    return yearThreePlanetOneQuestion();
                case 2:
                    return yearThreePlanetTwoQuestion();
                case 3:
                    return yearThreePlanetThreeQuestion();
                case 4:
                    return yearThreePlanetFourQuestion();
                case 5:
                    return yearThreePlanetFiveQuestion();
                case 8:
                    return yearThreePlanetEightQuestion();
                case 9:
                    let choiceArray = [1, 2, 3, 4, 5, 8];
                    let randomIndex = randomNumberGenerator(choiceArray.length);
                    return question(1, choiceArray[randomIndex]);
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 3.`);
            }
        case 4:
            switch(planetNumber) {
                case 1:
                    return yearFourPlanetOneQuestion();
                case 2:
                    return yearFourPlanetTwoQuestion();
                case 3:
                    return yearFourPlanetThreeQuestion();
                case 4:
                    return yearFourPlanetFourQuestion();
                case 5:
                    return yearFourPlanetFiveQuestion();
                case 6:
                    return yearFourPlanetSixQuestion();
                case 7:
                    return yearFourPlanetSevenQuestion();
                case 8:
                    return yearFourPlanetEightQuestion();
                case 9:
                    return yearFourPlanetSevenQuestion();
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 4.`);
            }
        default:
            throw new Error(`${yearNumber} is not a valid year.`)
    }
}

export function answer(yearNumber, planetNumber, values, playerAnswer) {
    switch(yearNumber) {
        case 1:
            switch(planetNumber) {
                case 4:
                    return yearOnePlanetFourAnswer(values, playerAnswer);
                case 5:
                    return yearOnePlanetFiveAnswer(values, playerAnswer);
                case 6:
                    return yearOnePlanetSixAnswer(values, playerAnswer);
                case 8:
                    return yearOnePlanetEightAnswer(values, playerAnswer);
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 1.`);
            }
        case 2:
            switch(planetNumber) {
                case 2:
                    return yearTwoPlanetTwoAnswer(values, playerAnswer);
                case 3:
                    return yearTwoPlanetThreeAnswer(values, playerAnswer);
                case 5:
                    return yearTwoPlanetFiveAnswer(values, playerAnswer);
                case 6:
                    return yearTwoPlanetSixAnswer(values, playerAnswer);
                case 7:
                    return yearTwoPlanetSevenAnswer(values, playerAnswer);
                case 8:
                    return yearTwoPlanetEightAnswer(values, playerAnswer);
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 2.`);
            }
        case 3:
            switch(planetNumber) {
                case 1:
                    return yearThreePlanetOneAnswer(values, playerAnswer);
                case 2:
                    return yearThreePlanetTwoAnswer(values, playerAnswer);
                case 3:
                    return yearThreePlanetThreeAnswer(values, playerAnswer);
                case 4:
                    return yearThreePlanetFourAnswer(values, playerAnswer);
                case 5:
                    return yearThreePlanetFiveAnswer(values, playerAnswer);
                case 8:
                    return yearThreePlanetEightAnswer(values, playerAnswer);
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 3.`);
            }
        case 4:
            switch(planetNumber) {
                case 1:
                    return yearFourPlanetOneAnswer(values, playerAnswer);
                case 2:
                    return yearFourPlanetTwoAnswer(values, playerAnswer);
                case 3:
                    return yearFourPlanetThreeAnswer(values, playerAnswer);
                case 4:
                    return yearFourPlanetFourAnswer(values, playerAnswer);
                case 5:
                    return yearFourPlanetFiveAnswer(values, playerAnswer);
                case 6:
                    return yearFourPlanetSixAnswer(values, playerAnswer);
                case 7:
                    return yearFourPlanetSevenAnswer(values, playerAnswer);
                case 8:
                    return yearFourPlanetEightAnswer(values, playerAnswer);
                case 9:
                    return yearFourPlanetSevenAnswer(values, playerAnswer);   // This should also call a timer!
                default:
                    throw new Error(`Planet ${planetNumber} is not valid for Year 4.`);
            }
        default:
            throw new Error(`${yearNumber} is not a valid year.`)
    }
}