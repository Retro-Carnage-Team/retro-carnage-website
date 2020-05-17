import { computeStickAngle, convertStickAngleToCardinalDirections } from './GamepadController';

test('Compute stick angle in radians for a point specified at 10 degrees', () => {
  const result = computeStickAngle(0.9848, 0.1736);
  expect(result).toBeCloseTo(0.1745329, 2);
});

test('Compute stick angle in radians for a point specified at 170 degrees', () => {
  const result = computeStickAngle(-0.9848, 0.1736);
  expect(result).toBeCloseTo(2.967059754, 2);
});

test('Angle of PI/4 get converted to up / right', () => {
  const { up, left, right, down } = convertStickAngleToCardinalDirections(Math.PI/4);
  expect(up).toBeTruthy();
  expect(down).toBeFalsy();
  expect(left).toBeFalsy();
  expect(right).toBeTruthy();
});

test('Angle of 3PI/4 get converted to up / right', () => {
  const { up, left, right, down } = convertStickAngleToCardinalDirections(3*Math.PI/4);
  expect(up).toBeTruthy();
  expect(down).toBeFalsy();
  expect(left).toBeTruthy();
  expect(right).toBeFalsy();
});
