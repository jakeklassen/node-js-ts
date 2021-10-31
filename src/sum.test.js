import { sum } from "./sum.js";
import expect from "expect";
import { test } from "uvu";

test("should sum all numbers", () => {
  expect(sum(1, -1, 2)).toBe(2);
});

test.run();
