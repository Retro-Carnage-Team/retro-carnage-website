import { DIRECTION_LEFT, DIRECTION_UP, DIRECTION_UP_RIGHT } from './Directions';
import { getMovementX, getMovementY, updatePlayerMovement } from './PlayerMovement';
import Rectangle from './Rectangle';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from './Tiles';

test('Should calculate the correct distance for various movements', () => {
  expect(getMovementX(100, DIRECTION_LEFT)).toBe(-75);
  expect(getMovementX(100, DIRECTION_UP)).toBe(0);
  expect(getMovementX(48, DIRECTION_UP_RIGHT)).toBe(25);
  expect(getMovementY(100, DIRECTION_LEFT)).toBe(0);
  expect(getMovementY(100, DIRECTION_UP)).toBe(-75);
  expect(getMovementY(48, DIRECTION_UP_RIGHT)).toBe(-25);
});

test('Should calculate new player position when in screen bounds', () => {
  const oldPosition = new Rectangle(750, 750, PLAYER_WIDTH, PLAYER_HEIGHT);
  const newPosition = updatePlayerMovement(48, DIRECTION_UP_RIGHT, oldPosition);
  expect(newPosition.x).toBe(775);
  expect(newPosition.y).toBe(725);
  expect(newPosition.width).toBe(PLAYER_WIDTH);
  expect(newPosition.height).toBe(PLAYER_HEIGHT);
});
