import { PointType } from "./point";
import { ValueOf } from "./type-utils/value-of";

export interface Point {
  x: number;
  y: number;
  type?: ValueOf<typeof PointType>;
}
