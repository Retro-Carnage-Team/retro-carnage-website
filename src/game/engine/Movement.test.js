import {getMovementX, getMovementY} from './Movement';
import {DIRECTION_LEFT, DIRECTION_UP, DIRECTION_UP_RIGHT} from './Directions';

test('Should calculate the correct distance for various movements', () => {
  expect(getMovementX(100, DIRECTION_LEFT, 0.75)).toBe(-75);
  expect(getMovementX(100, DIRECTION_UP, 0.75)).toBe(0);
  expect(getMovementX(48, DIRECTION_UP_RIGHT, 0.75)).toBe(25);
  expect(getMovementY(100, DIRECTION_LEFT, 0.75)).toBe(0);
  expect(getMovementY(100, DIRECTION_UP, 0.75)).toBe(-75);
  expect(getMovementY(48, DIRECTION_UP_RIGHT, 0.75)).toBe(-25);
});