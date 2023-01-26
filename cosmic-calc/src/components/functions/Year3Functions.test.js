import { expect, test } from "@jest/globals";
import {
  yearThreePlanetEightQuestion,
  yearThreePlanetFiveQuestion,
  yearThreePlanetFourQuestion,
  yearThreePlanetOneQuestion,
  yearThreePlanetThreeQuestion,
  yearThreePlanetTwoQuestion,
} from "./Year3Functions";
import { totalTests } from "./Year2Functions.test";

describe("Y3P1 - Given a number, add or subtract 1, 10, or 100.", () => {
  for (let i = 0; i < totalTests; i++) {
    let questionValues = yearThreePlanetOneQuestion();
    describe(`Test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure that the initial value is between 100 and 900.", async () => {
        expect(questionValues[0]).toBeGreaterThanOrEqual(100);
        expect(questionValues[0]).toBeLessThanOrEqual(900);
      });
      test("Ensure that the operation is either addition or subtraction", async () => {
        expect(["+", "-"]).toContain(questionValues[1]);
      });
      test("Ensure that the value of change is a power of 10 between 1 and 100.", async () => {
        expect([1, 10, 100]).toContain(questionValues[2]);
      });
    });
  }
});

describe("Y3P2 - Given a set of 5 numbers between 0 and 1000, sort them.", () => {
  for (let i = 0; i < totalTests; i++) {
    let questionValues = yearThreePlanetTwoQuestion();
    let sortedValues = questionValues.sort((a, b) => {
      return a - b;
    });
    describe(`Test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure we are given exactly 5 values.", async () => {
        expect(sortedValues.length).toBe(5);
      });
      test("Ensure all values are between 0 and 1000.", async () => {
        expect(sortedValues[0]).toBeGreaterThanOrEqual(0);
        expect(sortedValues[4]).toBeLessThanOrEqual(1000);
      });
      test("Ensure all values given are unique.", async () => {
        for (let j = 0; j < sortedValues.length - 1; j++) {
          expect(sortedValues[j]).toBeLessThan(sortedValues[j + 1]);
        }
      });
    });
  }
});

describe("Y3P3 - Add together two 3-digit numbers.", () => {
  for (let i = 0; i < totalTests; i++) {
    let questionValues = yearThreePlanetThreeQuestion();
    describe(`Test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure given values are between 100 and 999.", async () => {
        expect(questionValues[0] && questionValues[1]).toBeGreaterThanOrEqual(
          100
        );
        expect(questionValues[0] && questionValues[1]).toBeLessThanOrEqual(999);
      });
      test("Ensure the sum of the values does not exceed 1000.", async () => {
        expect(questionValues[0] + questionValues[1]).toBeLessThanOrEqual(1000);
      });
    });
  }
});

describe("Y3P4 - Subtracting numbers involving 3 digits.", () => {
  for (let i = 0; i < totalTests; i++) {
    let questionValues = yearThreePlanetFourQuestion();
    describe(`Test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure the first value is a 3-digit integer.", async () => {
        expect(questionValues[0]).toBeGreaterThanOrEqual(100);
        expect(questionValues[0]).toBeLessThanOrEqual(999);
        expect(questionValues[0] % 1).toBe(0);
      });
      test("Ensure that the second value is posit integer and no greater than the first value.", () => {
        expect(questionValues[1] % 1).toBe(0);
        expect(questionValues[1]).toBeGreaterThanOrEqual(1);
        expect(questionValues[1]).toBeLessThanOrEqual(questionValues[0]);
      });
    });
  }
});

describe("Y3P5 - Multiples of 2, 3, 4, 5, 8, and 10.", () => {
  for (let i = 0; i < totalTests; i++) {
    let questionValues = yearThreePlanetFiveQuestion();
    describe(`Test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure both values are integers between 1 and 12.", async () => {
        expect(questionValues[0] && questionValues[1]).toBeGreaterThanOrEqual(
          1
        );
        expect(questionValues[0] && questionValues[1]).toBeLessThanOrEqual(12);
        expect(questionValues[0] % 1 && questionValues[1] % 1).toBe(0);
      });
      test("Ensure at least one value is one of the required integers.", async () => {
        expect(
          [2, 3, 4, 5, 8, 10].includes(questionValues[0]) ||
            [2, 3, 4, 5, 8, 10].includes(questionValues[1])
        ).toBeTruthy();
      });
    });
  }
});

describe("Y3P8 - Adding and subtracting measurements.", () => {
  for (let i = 0; i < totalTests; i++) {
    let questionValues = yearThreePlanetEightQuestion();
    describe(`Test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure both values are integers between 1 and 1000.", async () => {
        expect(questionValues[0] && questionValues[2]).toBeGreaterThanOrEqual(
          1
        );
        expect(questionValues[0] && questionValues[2]).toBeLessThanOrEqual(
          1000
        );
        expect(questionValues[0] % 1 && questionValues[2] % 1).toBe(0);
      });
      test("Ensure the operation is addition or subtraction.", async () => {
        expect(["+", "-"]).toContain(questionValues[1]);
      });
    });
  }
  for (let i = 0; i < totalTests; i++) {
    let negativeTestValues = yearThreePlanetEightQuestion(true);
    describe(`Negative test ${i + 1} of ${totalTests}.`, () => {
      test("Ensure that if the operation is subtraction, the second number is not larger than the first.", async () => {
        expect(negativeTestValues[2]).toBeLessThanOrEqual(
          negativeTestValues[0]
        );
      });
    });
  }
});
