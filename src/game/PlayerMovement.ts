import {
  PLAYER_HIT_RECT_HEIGHT as PLAYER_HEIGHT,
  PLAYER_HIT_RECT_WIDTH as PLAYER_WIDTH,
  SCREEN_SIZE,
} from "./Engine";
import { getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import Point from "./Point";

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

/*
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
*/

export function updatePlayerMovement(
  elapsedTimeInMs: number,
  direction: Directions,
  oldPosition: Rectangle,
  obstacles: Rectangle[]
): Rectangle {
  const movement = getMovementVector(elapsedTimeInMs, direction);
  const restrictedMovement = calculateRestrictedMovement(
    oldPosition,
    movement,
    obstacles
  );

  /*
  const positionWithMovement = getNewPlayerPosition(
    elapsedTimeInMs,
    direction,
    oldPosition
  );
  const corrected = limitPlayerMovementToUnobstructedArea(
    direction,
    positionWithMovement,
    obstacles
  );
  return limitPlayerMovementToScreenArea(corrected);
  */
  return oldPosition;
}

export function calculateRestrictedMovement(
  oldPosition: Rectangle,
  movement: Point,
  obstacles: Rectangle[]
) {}
