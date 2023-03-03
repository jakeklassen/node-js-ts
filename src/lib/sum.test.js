import { expect } from "expect";
import test from "node:test";
import { sum } from "./sum.js";

test("should sum all numbers", () => {
  expect(sum(1, -1, 2)).toBe(2);
});
