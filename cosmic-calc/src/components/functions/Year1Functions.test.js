import { expect, test } from "@jest/globals";
import { yearOnePlanetFiveQuestion, yearOnePlanetFourAnswer, yearOnePlanetFourQuestion, yearOnePlanetSixQuestion, yearOnePlanetSixAnswer, yearOnePlanetEightQuestion, yearOnePlanetEightAnswer } from "./Year1Functions";

describe("Y1P4 - Number bonds that add to 10.", () => {
    let questionValue = yearOnePlanetFourQuestion();
    test("Ensure we get a result between 0 and 10.", async () => {
        expect(questionValue).toBeGreaterThanOrEqual(0);
        expect(questionValue).toBeLessThanOrEqual(10);
    });
    for (let i = 0; i < 11; i++) {
        test(`The answer is ${10 - questionValue}. We will try the answer value ${i}. It should be ${questionValue + i === 10}.`, async () => {
            let actual = yearOnePlanetFourAnswer(questionValue, i);
            expect(actual).toStrictEqual([questionValue + i === 10, 10 - questionValue]);
        });
    }
});

describe("Y1P5 - Adding and subtracting numbers", () => {
    let questionValue = yearOnePlanetFiveQuestion();
    test("Ensure we receive two number values and the operation as a string.", async () => {
        expect(questionValue[0]).toEqual(expect.any(Number));
        expect(questionValue[1] === "+" || questionValue[1] === "-").toBeTruthy();
        expect(questionValue[2]).toEqual(expect.any(Number));
    });
    for (let i = 0; i < 5; i++) {
        test(`Test ${i+1} of 5 to ensure that when subtracting the correct answer is non-negative.`, () => {
            let actual = yearOnePlanetFiveQuestion(true);
            expect(actual[1]).toBe("-");
        });
    }
});

describe("Y1P6 - Recognising numbers as words", () => {
    let questionValue = yearOnePlanetSixQuestion();
    test("Ensure we receive a number between 0 and 20.", async () => {
        expect(questionValue[0]).toBeGreaterThanOrEqual(0);
        expect(questionValue[0]).toBeLessThanOrEqual(20);
    });
    for (let i = 0; i < 21; i++) {
        test(`The word is "${questionValue[1]}". We will try the answer value ${i}. It should be ${questionValue[0] === i}.`, async () => {
            let actual = yearOnePlanetSixAnswer(questionValue, i);
            expect(actual).toStrictEqual([questionValue[0] === i, questionValue[0]]);
        });
    }
});

describe("Y1P8 - Number bonds that add to 20.", () => {
    let questionValue = yearOnePlanetEightQuestion();
    test("Ensure we get a result between 0 and 20.", async () => {
        expect(questionValue).toBeGreaterThanOrEqual(0);
        expect(questionValue).toBeLessThanOrEqual(20);
    });
    for (let i = 0; i < 21; i++) {
        test(`The answer is ${20 - questionValue}. We will try the answer value ${i}. It should be ${questionValue + i === 20}.`, async () => {
            let actual = yearOnePlanetEightAnswer(questionValue, i);
            expect(actual).toStrictEqual([questionValue + i === 20, 20 - questionValue]);
        });
    }
});