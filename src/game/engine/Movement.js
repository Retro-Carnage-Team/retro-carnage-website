import {
  DIRECTION_DOWN,
  DIRECTION_DOWN_LEFT,
  DIRECTION_DOWN_RIGHT, DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP, DIRECTION_UP_LEFT,
  DIRECTION_UP_RIGHT
} from './Directions';

export function getMovementDistance(elapsedTimeInMs, distancePerMs, maxDistance) {
  const distance = elapsedTimeInMs * distancePerMs;
  return maxDistance ? Math.min(maxDistance, distance) : distance;
}

export function getMovementX(elapsedTimeInMs, direction, distancePerMs, maxDistance) {
  const distanceExact = getMovementDistance(elapsedTimeInMs, distancePerMs, maxDistance);
  const diagonalDistance = Math.round(Math.sqrt((distanceExact * distanceExact) / 2));
  const distance = Math.round(distanceExact);
  switch(direction) {
    case DIRECTION_UP: return 0;
    case DIRECTION_UP_RIGHT: return diagonalDistance;
    case DIRECTION_RIGHT: return distance;
    case DIRECTION_DOWN_RIGHT: return diagonalDistance;
    case DIRECTION_DOWN: return 0;
    case DIRECTION_DOWN_LEFT: return diagonalDistance * -1;
    case DIRECTION_LEFT: return distance * -1;
    case DIRECTION_UP_LEFT: return diagonalDistance * -1;
    default: return 0;
  }
}

export function getMovementY(elapsedTimeInMs, direction, distancePerMs, maxDistance) {
  const distanceExact = getMovementDistance(elapsedTimeInMs, distancePerMs, maxDistance);
  const diagonalDistance = Math.round(Math.sqrt((distanceExact * distanceExact) / 2));
  const distance = Math.round(distanceExact);
  switch(direction) {
    case DIRECTION_UP: return distance * -1;
    case DIRECTION_UP_RIGHT: return diagonalDistance * -1;
    case DIRECTION_RIGHT: return 0;
    case DIRECTION_DOWN_RIGHT: return diagonalDistance;
    case DIRECTION_DOWN: return distance;
    case DIRECTION_DOWN_LEFT: return diagonalDistance;
    case DIRECTION_LEFT: return 0;
    case DIRECTION_UP_LEFT: return diagonalDistance * -1;
    default: return 0;
  }
}