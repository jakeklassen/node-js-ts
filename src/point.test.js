const point = require("./point");

describe("sumPoints", () => {
  it("should sum the points", () => {
    expect(point.sumPoints({ x: 0, y: 1 }, { x: 1, y: 0 })).toEqual({
      x: 1,
      y: 1,
    });
  });
});
