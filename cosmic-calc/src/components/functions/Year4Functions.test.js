import { expect, test } from "@jest/globals";
import { yearFourPlanetEightQuestion, yearFourPlanetFiveQuestion, yearFourPlanetFourQuestion, yearFourPlanetOneQuestion, yearFourPlanetSevenQuestion, yearFourPlanetSixQuestion, yearFourPlanetThreeQuestion, yearFourPlanetTwoQuestion } from "./Year4Functions";
import { totalTests } from "./Year2Functions.test";

describe("Y4P1 - Multiples of 6, 7, and 9.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetOneQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure both values are integers between 1 and 12.", async () => {
                expect(questionValues[0] && questionValues[1]).toBeGreaterThanOrEqual(1);
                expect(questionValues[0] && questionValues[1]).toBeLessThanOrEqual(12);
                expect(questionValues[0] % 1 && questionValues[1] % 1).toBe(0);
            });
            test("Ensure at least one value is one of the required integers.", async () => {
                expect([6, 7, 9].includes(questionValues[0]) || [6, 7, 9].includes(questionValues[1])).toBeTruthy();
            });
        });
    }
});

describe("Y4P2 - Given a number, add or subtract 1, 10, 100, or 1000.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetTwoQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure that the initial value is between 1000 and 9000.", async () => {
                expect(questionValues[0]).toBeGreaterThanOrEqual(1000);
                expect(questionValues[0]).toBeLessThanOrEqual(9000);
            });
            test("Ensure that the operation is either addition or subtraction", async () => {
                expect(["+", "-"]).toContain(questionValues[1]);
            });
            test("Ensure that the value of change is a power of 10 between 1 and 1000.", async () => {
                expect([1, 10, 100, 1000]).toContain(questionValues[2]);
            });
        });
    }
});

describe("Y4P3 - Basic subtraction into the negative numbers.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetThreeQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure the second value is larger than the first value", async () => {
                expect(questionValues[1]).toBeGreaterThan(questionValues[0]);
            });
            test("Ensure that the outcome is not less than -10.", async () => {
                expect(questionValues[0] - questionValues[1]).toBeGreaterThanOrEqual(-10);
            });
        });
    }
});

describe("Y4P4 - Given a set of 5 numbers between 0 and 10000, sort them.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetFourQuestion();
        let sortedValues = questionValues.sort((a, b) => {return a - b});
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure we are given exactly 5 values.", async () => {
                expect(sortedValues.length).toBe(5);
            });
            test("Ensure all values are between 0 and 1000.", async () => {
                expect(sortedValues[0]).toBeGreaterThanOrEqual(0);
                expect(sortedValues[4]).toBeLessThanOrEqual(10000);
            });
            test("Ensure all values given are unique.", async () => {
                for (let j = 0; j < sortedValues.length - 1; j++) {
                    expect(sortedValues[j]).toBeLessThan(sortedValues[j + 1]);
                }
            });
        });
    }
});

describe("Y4P5 - Round to the nearest 10, 100, or 1000", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetFiveQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure that the first value is between 1 and 9999", async () => {
                expect(questionValues[0]).toBeGreaterThanOrEqual(1);
                expect(questionValues[0]).toBeLessThanOrEqual(9999);
            });
            test("Ensure that the final digit of the number is not zero.", async () => {
                let numberString = questionValues[0].toString();
                expect(numberString[numberString.length - 1]).not.toBe("0");
            });
            test("Ensure that the number is being rounded to either the nearest 10, 100, or 1000", async () => {
                expect([10, 100, 1000]).toContain(questionValues[1]);
            });
        });
    }
});

describe("Y4P6 - Adding and subtracting measurements.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetSixQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure both values are integers between 1 and 1000.", async () => {
                expect(questionValues[0] && questionValues[2]).toBeGreaterThanOrEqual(1);
                expect(questionValues[0] && questionValues[2]).toBeLessThanOrEqual(1000);
                expect(questionValues[0] % 1 && questionValues[2] % 1).toBe(0);
            });
            test("Ensure the operation is addition or subtraction.", async () => {
                expect(["+", "-"]).toContain(questionValues[1]);
            });
        });
    }
    for (let i = 0; i < totalTests; i++) {
        let negativeTestValues = yearFourPlanetSixQuestion(true);
        describe(`Negative test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure that if the operation is subtraction, the second number is not larger than the first.", async () => {
                expect(negativeTestValues[2]).toBeLessThanOrEqual(negativeTestValues[0]);
            });
        });
    }
});

describe("Y4P7 - Multiples of all numbers from 0 to 12", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetSevenQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure both numbers are integers", async () => {
                expect(questionValues[0] % 1).toBe(0);
                expect(questionValues[1] % 1).toBe(0);
            });
            test("Ensure both numbers are between 0 and 12", async () => {
                expect(questionValues[0] && questionValues[1]).toBeGreaterThanOrEqual(0);
                expect(questionValues[0] && questionValues[1]).toBeLessThanOrEqual(12);
            });
        });
    }
});

describe("Y4P8 - Multiply three numbers together.", () => {
    for (let i = 0; i < totalTests; i++) {
        let questionValues = yearFourPlanetEightQuestion();
        describe(`Test ${i + 1} of ${totalTests}.`, () => {
            test("Ensure three numbers are given", async () => {
                expect(questionValues.length).toBe(3);
            });
            test("Ensure all three numbers are integers", async () => {
                for (let j = 0; j < questionValues.length; j++) {
                    expect(questionValues[j] % 1).toBe(0);
                }
            });
            test("Ensure both numbers are between 0 and 10", async () => {
                for (let j = 0; j < questionValues.length; j++) {
                    expect(questionValues[j]).toBeGreaterThanOrEqual(0);
                    expect(questionValues[j]).toBeLessThanOrEqual(10);
                }
            });
        });
    }
});