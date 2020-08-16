import {
  PLAYER_HIT_RECT_HEIGHT as PLAYER_HEIGHT,
  PLAYER_HIT_RECT_WIDTH as PLAYER_WIDTH,
  SCREEN_SIZE,
} from "./Engine";
import { getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import Point from "./Point";
import CollisionDetector from "./CollisionDetector";

export const MIN_PLAYER_DISTANCE_TO_BORDER = 25;
const PLAYER_MOVEMENT_PER_MS = 0.75; // Screen.width = 1500 / 2.000 milliseconds = 0.75 px / ms

function getMovementVector(
  elapsedTimeInMs: number,
  direction: Directions
): Point {
  return {
    x: getMovementX(
      elapsedTimeInMs,
      direction,
      PLAYER_MOVEMENT_PER_MS,
      undefined
    ),
    y: getMovementY(
      elapsedTimeInMs,
      direction,
      PLAYER_MOVEMENT_PER_MS,
      undefined
    ),
  };
}

function limitPlayerMovementToScreenArea(position: Rectangle): Rectangle {
  if (position.x < MIN_PLAYER_DISTANCE_TO_BORDER) {
    position.x = MIN_PLAYER_DISTANCE_TO_BORDER;
  }
  if (position.x > SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_WIDTH) {
    position.x = SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_WIDTH;
  }
  if (position.y < MIN_PLAYER_DISTANCE_TO_BORDER) {
    position.y = MIN_PLAYER_DISTANCE_TO_BORDER;
  }
  if (
    position.y >
    SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_HEIGHT
  ) {
    position.y = SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_HEIGHT;
  }
  return position;
}

export function updatePlayerMovement(
  elapsedTimeInMs: number,
  direction: Directions,
  oldPosition: Rectangle,
  obstacles: Rectangle[]
): Rectangle {
  const movement = getMovementVector(elapsedTimeInMs, direction);

  let updated = false;
  let updatedPosition = oldPosition;
  obstacles.forEach((obstacle) => {
    const restrictedMovement = CollisionDetector.stopMovementOnCollision(
      updatedPosition,
      obstacle,
      direction,
      movement
    );
    if (restrictedMovement) {
      updated = true;
      updatedPosition = restrictedMovement;
    }
  });

  return limitPlayerMovementToScreenArea(
    updated ? updatedPosition : oldPosition.add(movement)
  );
}
