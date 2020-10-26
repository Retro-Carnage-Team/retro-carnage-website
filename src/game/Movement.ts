import { Directions } from "./Directions";

export function getMovementDistance(
  elapsedTimeInMs: number,
  distancePerMs: number,
  maxDistance: number | undefined
) {
  const distance = elapsedTimeInMs * distancePerMs;
  return maxDistance ? Math.min(maxDistance, distance) : distance;
}

function getMovement(
  elapsedTimeInMs: number,
  direction: Directions,
  distancePerMs: number,
  maxDistance: number | undefined,
  fn: (
    direction: Directions,
    distance: number,
    diagonalDistance: number
  ) => number
) {
  const distanceExact = getMovementDistance(
    elapsedTimeInMs,
    distancePerMs,
    maxDistance
  );
  const diagonalDistance = Math.round(
    Math.sqrt((distanceExact * distanceExact) / 2)
  );
  const distance = Math.round(distanceExact);
  return fn(direction, distance, diagonalDistance);
}

export function getMovementX(
  elapsedTimeInMs: number,
  direction: Directions,
  distancePerMs: number,
  maxDistance: number | undefined
): number {
  const fn = (
    direction: Directions,
    distance: number,
    diagonalDistance: number
  ): number => {
    switch (direction) {
      case Directions.Up:
        return 0;
      case Directions.UpRight:
        return diagonalDistance;
      case Directions.Right:
        return distance;
      case Directions.DownRight:
        return diagonalDistance;
      case Directions.Down:
        return 0;
      case Directions.DownLeft:
        return diagonalDistance * -1;
      case Directions.Left:
        return distance * -1;
      case Directions.UpLeft:
        return diagonalDistance * -1;
      default:
        return 0;
    }
  };
  return getMovement(
    elapsedTimeInMs,
    direction,
    distancePerMs,
    maxDistance,
    fn
  );
}

export function getMovementY(
  elapsedTimeInMs: number,
  direction: Directions,
  distancePerMs: number,
  maxDistance: number | undefined
): number {
  const fn = (
    direction: Directions,
    distance: number,
    diagonalDistance: number
  ): number => {
    switch (direction) {
      case Directions.Up:
        return distance * -1;
      case Directions.UpRight:
        return diagonalDistance * -1;
      case Directions.Right:
        return 0;
      case Directions.DownRight:
        return diagonalDistance;
      case Directions.Down:
        return distance;
      case Directions.DownLeft:
        return diagonalDistance;
      case Directions.Left:
        return 0;
      case Directions.UpLeft:
        return diagonalDistance * -1;
      default:
        return 0;
    }
  };
  return getMovement(
    elapsedTimeInMs,
    direction,
    distancePerMs,
    maxDistance,
    fn
  );
}
