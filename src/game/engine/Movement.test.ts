import { getMovementX, getMovementY } from "./Movement";
import { Directions } from "./Directions";

test("Should calculate the correct distance for various movements", () => {
  expect(getMovementX(100, Directions.Left, 0.75, undefined)).toBe(-75);
  expect(getMovementX(100, Directions.Up, 0.75, undefined)).toBe(0);
  expect(getMovementX(48, Directions.UpRight, 0.75, undefined)).toBe(25);
  expect(getMovementY(100, Directions.Left, 0.75, undefined)).toBe(0);
  expect(getMovementY(100, Directions.Up, 0.75, undefined)).toBe(-75);
  expect(getMovementY(48, Directions.UpRight, 0.75, undefined)).toBe(-25);
});
