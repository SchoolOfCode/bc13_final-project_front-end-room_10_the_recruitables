import { expect, test } from "@jest/globals";
import { yearTwoPlanetTwoQuestion, yearTwoPlanetTwoAnswer, yearTwoPlanetThreeQuestion, yearTwoPlanetThreeAnswer, yearTwoPlanetFiveQuestion, yearTwoPlanetFiveAnswer, yearTwoPlanetSixQuestion, 
    yearTwoPlanetSixAnswer, yearTwoPlanetSevenQuestion, yearTwoPlanetSevenAnswer, yearTwoPlanetEightQuestion, yearTwoPlanetEightAnswer } from "./Year2Functions";

describe("Y2P2 - add or subtract in step of 10 from 100.", () => {
    let questionValue = yearTwoPlanetTwoQuestion();
    test("Ensure we get a result between 0 and 100 in .", async () => {
        expect(questionValue[0]).toBeGreaterThanOrEqual(0);
        expect(questionValue[0]).toBeLessThanOrEqual(100);
        expect(questionValue[1] === "+" || questionValue[1] === "-").toBeTruthy();
        expect(questionValue[2] % 10).toBe(0);
    });
    for (let i = 0; i < 10; i++) {
        questionValue = yearTwoPlanetTwoQuestion()
        test(`Test ${i} of 10. Question is ${questionValue[0]} ${questionValue[1]} ${questionValue[2]}`, async () => {
            let playerAnswer;
            if(questionValue[1] === "+") {
                playerAnswer = questionValue[0] + questionValue[2]
            } else {
                playerAnswer = questionValue[0] - questionValue[2]
            }
            let actual = yearTwoPlanetTwoAnswer(questionValue, playerAnswer);
            expect(actual).toStrictEqual([true, questionValue]);
        });
    }
});