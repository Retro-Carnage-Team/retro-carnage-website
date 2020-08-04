import { Directions } from "./Directions";
import { updatePlayerMovement } from "./PlayerMovement";
import Rectangle from "./Rectangle";
import {
  PLAYER_HIT_RECT_HEIGHT as PLAYER_HEIGHT,
  PLAYER_HIT_RECT_WIDTH as PLAYER_WIDTH,
} from "./Engine";

test("Should calculate new player position when in screen bounds", () => {
  const oldPosition = new Rectangle(750, 750, PLAYER_WIDTH, PLAYER_HEIGHT);
  const newPosition = updatePlayerMovement(
    48,
    Directions.UpRight,
    oldPosition,
    []
  );
  expect(newPosition.x).toBe(775);
  expect(newPosition.y).toBe(725);
  expect(newPosition.width).toBe(PLAYER_WIDTH);
  expect(newPosition.height).toBe(PLAYER_HEIGHT);
});
