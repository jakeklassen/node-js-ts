import expect from "expect";
import { test } from "uvu";
import { PointType, sumPoints } from "./point.js";

test("should sum the points", () => {
  expect(
    sumPoints({ x: 0, y: 1, type: PointType.Floating }, { x: 1, y: 0 }),
  ).toEqual({
    x: 1,
    y: 1,
  });
});

test.run();
