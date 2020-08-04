import {
  PLAYER_HIT_RECT_HEIGHT as PLAYER_HEIGHT,
  PLAYER_HIT_RECT_WIDTH as PLAYER_WIDTH,
  SCREEN_SIZE,
} from "./Engine";
import { getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import { Directions } from "./Directions";

export const MIN_PLAYER_DISTANCE_TO_BORDER = 25;
const PLAYER_MOVEMENT_PER_MS = 0.75; // Screen.width = 1500 / 2.000 milliseconds = 0.75 px / ms

function getNewPlayerPosition(
  elapsedTimeInMs: number,
  direction: Directions,
  oldPosition: Rectangle
): Rectangle {
  const { x, y, width, height } = oldPosition;
  return new Rectangle(
    x +
      getMovementX(
        elapsedTimeInMs,
        direction,
        PLAYER_MOVEMENT_PER_MS,
        undefined
      ),
    y +
      getMovementY(
        elapsedTimeInMs,
        direction,
        PLAYER_MOVEMENT_PER_MS,
        undefined
      ),
    width,
    height
  );
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

function limitPlayerMovementToUnobstructedArea(
  direction: Directions,
  position: Rectangle,
  obstacles: Rectangle[]
): Rectangle {
  const limitUp = (pos: Rectangle): Rectangle => {
    const lowerBounds = obstacles
      .filter((o) => null !== o.getIntersection(position))
      .map((o) => o.y + o.height);

    if (0 < lowerBounds.length) {
      const lowestBound = Math.max(...lowerBounds);
      const { x, width, height } = pos;
      return new Rectangle(x, lowestBound + 1, width, height);
    }
    return pos;
  };
  const limitLeft = (pos: Rectangle): Rectangle => {
    const rightBounds = obstacles
      .filter((o) => null !== o.getIntersection(position))
      .map((o) => o.x + o.width);
    if (0 < rightBounds.length) {
      const rightMostBound = Math.max(...rightBounds);
      const { y, width, height } = pos;
      return new Rectangle(rightMostBound + 1, y, width, height);
    }
    return pos;
  };
  const limitRight = (pos: Rectangle): Rectangle => {
    const leftBounds = obstacles
      .filter((o) => null !== o.getIntersection(position))
      .map((o) => o.x);
    if (0 < leftBounds.length) {
      const leftMostBound = Math.min(...leftBounds);
      const { y, width, height } = pos;
      return new Rectangle(leftMostBound - width - 1, y, width, height);
    }
    return pos;
  };
  const limitDown = (pos: Rectangle): Rectangle => {
    const upperBounds = obstacles
      .filter((o) => null !== o.getIntersection(position))
      .map((o) => o.y);
    if (0 < upperBounds.length) {
      const upMostBound = Math.min(...upperBounds);
      const { x, width, height } = pos;
      return new Rectangle(x, upMostBound - height - 1, width, height);
    }
    return pos;
  };

  switch (direction) {
    case Directions.Left:
      return limitLeft(position);
    case Directions.UpLeft:
      return limitUp(limitLeft(position));
    case Directions.Up:
      return limitUp(position);
    case Directions.UpRight:
      return limitUp(limitRight(position));
    case Directions.Right:
      return limitRight(position);
    case Directions.DownRight:
      return limitDown(limitRight(position));
    case Directions.Down:
      return limitDown(position);
    case Directions.DownLeft:
      return limitLeft(position);
  }
}

export function updatePlayerMovement(
  elapsedTimeInMs: number,
  direction: Directions,
  oldPosition: Rectangle,
  obstacles: Rectangle[]
): Rectangle {
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
}
