import { ValueOf } from "./type-utils/value-of";
import { PointType } from "./point";

export interface Point {
  x: number;
  y: number;
  type?: ValueOf<typeof PointType>;
}
