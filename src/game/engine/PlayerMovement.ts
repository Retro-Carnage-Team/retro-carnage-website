import {
  PLAYER_HIT_RECT_HEIGHT as PLAYER_HEIGHT,
  PLAYER_HIT_RECT_WIDTH as PLAYER_WIDTH
} from './Engine';
import { SCREEN_SIZE } from './Engine';
import { getMovementX, getMovementY } from './Movement';
import Rectangle from './Rectangle';
import {Directions} from "./Directions";

export const MIN_PLAYER_DISTANCE_TO_BORDER = 25;
const PLAYER_MOVEMENT_PER_MS = 0.75;                  // Screen.width = 1500 / 2.000 milliseconds = 0.75 px / ms

export function limitPlayerMovementToScreenArea(position: Rectangle): Rectangle {
  if(position.x < MIN_PLAYER_DISTANCE_TO_BORDER) {
    position.x = MIN_PLAYER_DISTANCE_TO_BORDER;
  }
  if(position.x > SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_WIDTH) {
    position.x = SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_WIDTH;
  }
  if(position.y < MIN_PLAYER_DISTANCE_TO_BORDER) {
    position.y = MIN_PLAYER_DISTANCE_TO_BORDER;
  }
  if(position.y > SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_HEIGHT) {
    position.y = SCREEN_SIZE - MIN_PLAYER_DISTANCE_TO_BORDER - PLAYER_HEIGHT;
  }
  return position;
}

export function updatePlayerMovement(elapsedTimeInMs: number, direction: Directions, oldPosition: Rectangle): Rectangle {
  const result = new Rectangle(oldPosition.x, oldPosition.y, oldPosition.width, oldPosition.height);
  result.x += getMovementX(elapsedTimeInMs, direction, PLAYER_MOVEMENT_PER_MS, undefined);
  result.y += getMovementY(elapsedTimeInMs, direction, PLAYER_MOVEMENT_PER_MS, undefined);
  return limitPlayerMovementToScreenArea(result);
}
