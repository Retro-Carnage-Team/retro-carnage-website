import {Directions} from './Directions';

export function getMovementDistance(elapsedTimeInMs: number, distancePerMs: number, maxDistance: number | undefined) {
  const distance = elapsedTimeInMs * distancePerMs;
  return maxDistance ? Math.min(maxDistance, distance) : distance;
}

export function getMovementX(elapsedTimeInMs: number, direction: Directions, distancePerMs: number, maxDistance: number | undefined) {
  const distanceExact = getMovementDistance(elapsedTimeInMs, distancePerMs, maxDistance);
  const diagonalDistance = Math.round(Math.sqrt((distanceExact * distanceExact) / 2));
  const distance = Math.round(distanceExact);
  switch(direction) {
    case Directions.Up: return 0;
    case Directions.UpRight: return diagonalDistance;
    case Directions.Right: return distance;
    case Directions.DownRight: return diagonalDistance;
    case Directions.Down: return 0;
    case Directions.DownLeft: return diagonalDistance * -1;
    case Directions.Left: return distance * -1;
    case Directions.UpLeft: return diagonalDistance * -1;
    default: return 0;
  }
}

export function getMovementY(elapsedTimeInMs: number, direction: Directions, distancePerMs: number, maxDistance: number | undefined) {
  const distanceExact = getMovementDistance(elapsedTimeInMs, distancePerMs, maxDistance);
  const diagonalDistance = Math.round(Math.sqrt((distanceExact * distanceExact) / 2));
  const distance = Math.round(distanceExact);
  switch(direction) {
    case Directions.Up: return distance * -1;
    case Directions.UpRight: return diagonalDistance * -1;
    case Directions.Right: return 0;
    case Directions.DownRight: return diagonalDistance;
    case Directions.Down: return distance;
    case Directions.DownLeft: return diagonalDistance;
    case Directions.Left: return 0;
    case Directions.UpLeft: return diagonalDistance * -1;
    default: return 0;
  }
}
