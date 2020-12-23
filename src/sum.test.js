const sum = require("./sum");

describe("sum", () => {
  it("should sum all numbers", () => {
    expect(sum(1, -1, 2)).toBe(2);
  });
});
