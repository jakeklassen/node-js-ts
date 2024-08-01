import { ValueOf } from "#app/type-utils/value-of.js";
import type { PointType } from "./point.js";

export interface Point {
  x: number;
  y: number;
  type?: ValueOf<typeof PointType>;
}
