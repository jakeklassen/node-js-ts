import { PointType } from "./point.js";
import { ValueOf } from "#app/type-utils/value-of.js";

export interface Point {
  x: number;
  y: number;
  type?: ValueOf<typeof PointType>;
}
