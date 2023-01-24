import { expect, test } from "@jest/globals";
import { yearTwoPlanetTwoQuestion, yearTwoPlanetThreeQuestion, yearTwoPlanetThreeAnswer, yearTwoPlanetFiveQuestion, yearTwoPlanetSixQuestion, yearTwoPlanetEightQuestion } from "./Year2Functions";

export let totalTests = 10;

describe("Y2P2 - Add or subtract in step of 10 from 100.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearTwoPlanetTwoQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure our intial number is between 0 and 100.", async () => {
                expect(questionValues[0]).toBeGreaterThanOrEqual(0);
                expect(questionValues[0]).toBeLessThanOrEqual(100);
            });
            test("Ensure we get an operator which is either addition or subtraction.", async () => {
                expect(["+", "-"]).toContain(questionValues[1]);
            });
            test("Ensure the number we are adding or subtracting is a multiple of 10.", async () => {
                expect(questionValues[2] % 10).toBe(0);
            });
            test("Ensure that the correct answer is between 0 and 100.", async () => {
                let correctAnswer;
                if (questionValues[1] === "+") {
                    correctAnswer = questionValues[0] + questionValues[2];
                } else {
                    correctAnswer = questionValues[0] - questionValues[2];
                }
                expect(correctAnswer).toBeGreaterThanOrEqual(0);
                expect(correctAnswer).toBeLessThanOrEqual(100);
            })
        });
    }
});

describe("Y2P3 - Recognising numbers as words.", () => {
    let questionValue = yearTwoPlanetThreeQuestion();
    test("Ensure we receive a number between 0 and 100.", async () => {
        expect(questionValue[0]).toBeGreaterThanOrEqual(0);
        expect(questionValue[0]).toBeLessThanOrEqual(100);
    });
    for (let i = 0; i < 101; i++) {
        test(`The word is "${questionValue[1]}". We will try the answer value ${i}. It should be ${questionValue[0] === i}.`, async () => {
            let actual = yearTwoPlanetThreeAnswer(questionValue, i);
            expect(actual).toStrictEqual([questionValue[0] === i, questionValue[0]]);
        });
    }
});

describe("Y2P5 - Add together three single-digit numbers.", () => {
    test("Ensure that we receive three integers between 0 and 10.", async () => {
        let questionValues = yearTwoPlanetFiveQuestion();
        expect(questionValues.length).toBe(3);
        for (let i = 0; i < questionValues.length; i++) {
            expect(questionValues[i]).toBeGreaterThanOrEqual(0);
            expect(questionValues[i]).toBeLessThanOrEqual(10);
        }
    });
    describe("Ensure that at least one pair of the three numbers are a bond of 10.", () => {
        for (let i = 0; i < totalTests; i++) {
            test(`Test ${i + 1} of ${totalTests}.`, async () => {
                let questionValues = yearTwoPlanetFiveQuestion();
                let pair12 = questionValues[0] + questionValues[1];
                let pair13 = questionValues[0] + questionValues[2];
                let pair23 = questionValues[1] + questionValues[2];
                expect(pair12 === 10 || pair13 === 10 || pair23 === 10).toBeTruthy();
            });
        }
    });
});

describe("Y2P6 - Finding a fraction of a number.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearTwoPlanetSixQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure that the denominator is an integer between 2 and 4", async () => {
                expect([2, 3, 4]).toContain(questionValues[1]);
            });
            test("Ensure that the numerator is a positive integer and no more than the denominator.", async () => {
                expect(questionValues[0]).toBeGreaterThanOrEqual(1);
                expect(questionValues[0]).toBeLessThanOrEqual(questionValues[1]);
                expect(questionValues[0] % 1).toBe(0);
            });
            test("Ensure that the whole number is evenly divisible by the denominator.", async () => {
                expect(questionValues[2] % questionValues[1]).toBe(0);
            });
        });
    }
});

describe("Y2P8 - Comparing numbers with <, =, and >", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearTwoPlanetEightQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure that both numbers are integers", async () => {
                expect(questionValues[0] % 1).toBe(0);
                expect(questionValues[1] % 1).toBe(0);
            });
            test("Ensure that both numbers are between 0 and 20.", async () => {
                expect(questionValues[0] >= 0 && questionValues[1] >= 0).toBeTruthy();
                expect(questionValues[0] <= 20 && questionValues[1] <= 20).toBeTruthy()
            });
        });
    }
});