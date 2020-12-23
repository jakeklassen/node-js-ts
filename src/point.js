/**
 * Sum a list of points
 * @param  {...import('./point.type').Point} points
 */
export const sumPoints = (...points) =>
  points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), {
    x: 0,
    y: 0,
  });

export const PointType = {
  Floating: /** @type {'floating'} */ ("floating"),
};
