/**
 * Sum a list of points
 * @param  {...import('./point.type').Point} points
 */
const sumPoints = (...points) =>
  points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), {
    x: 0,
    y: 0,
  });

exports.sumPoints = sumPoints;
