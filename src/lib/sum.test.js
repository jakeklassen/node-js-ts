import expect from "expect";
import { it } from "mocha";
import { sum } from "./sum.js";

it("should sum all numbers", () => {
  expect(sum(1, -1, 2)).toBe(2);
});
