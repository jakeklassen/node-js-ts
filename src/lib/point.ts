import type { ValueOf } from "#app/type-utils/value-of.ts";

export const PointType = {
  Floating: "floating",
} as const;

export interface Point {
  readonly x: number;
  readonly y: number;
  readonly type?: ValueOf<typeof PointType>;
}

/**
 * Sum a list of points
 */
export const sumPoints = (...points: readonly Point[]) =>
  points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), {
    x: 0,
    y: 0,
  });
