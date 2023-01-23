import { expect, test } from "@jest/globals";
import { yearOnePlanetFiveQuestion, yearOnePlanetFourAnswer, yearOnePlanetFourQuestion } from "./Year1Functions";

test("Y1P4Q - We receive various number bonds to 10.", async () => {
    let actual = yearOnePlanetFourQuestion();
    expect(actual).toBeGreaterThanOrEqual(0);
    expect(actual).toBeLessThanOrEqual(10);
});

test("Y1P4A - We give the correct answer.", async () => {
    let questionValue = yearOnePlanetFourQuestion();
    let actual = yearOnePlanetFourAnswer(questionValue, 10 - questionValue);
    expect(actual).toStrictEqual([true, 10 - questionValue]);
});

test("Y1P4A - We give an incorrect answer.", async () => {
    let questionValue = yearOnePlanetFourQuestion();
    let actual = yearOnePlanetFourAnswer(questionValue, 11);
    expect(actual).toStrictEqual([false, 10 - questionValue]);
});

test("Y1P5Q - We expect two numbers and an operation.", async () => {
    let actual = yearOnePlanetFiveQuestion();
    expect(actual[0]).toEqual(expect.any(Number));
    expect(actual[1]).toEqual(expect.any(String));
    expect(actual[2]).toEqual(expect.any(Number));
});

test("Y1P5Q - If subtracting, the second number must not be larger than the first number.", async () => {
    let actual = yearOnePlanetFiveQuestion(true);
    expect(actual[0]).toBeGreaterThanOrEqual(actual[2]);
});

test("Y1P5A - We give the correct answer.", async () => {
    let questionValue = yearOnePlanetFiveQuestion();
    let playerAnswer;
    if (values[1] === "+") {
        playerAnswer = values[0] + values[2];
    } else {
        playerAnswer = values[0] - values[2];
    }
    let actual = yearOnePlanetFiveAnswer(questionValue, playerAnswer);
    expect(actual).toStrictEqual([true, playerAnswer])
});