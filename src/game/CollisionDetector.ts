import Rectangle from "./Rectangle";
import Point from "./Point";
import { Directions } from "./Directions";
import Line from "./Line";

interface CollisionCheckForCardinalDirection {
  getLine(): Line;
  getFirstVector(): Line;
  getSecondVector(): Line;
}

export default class CollisionDetector {
  /**
   * Checks for a possible collision of rectangles movingRect and stillRect when movingRect gets moved into direction by
   * the specified distance.
   *
   * @param movingRect the rectangle that gets moved
   * @param stillRect another rectangle that doesn't move
   * @param direction direction of movement of movingRect
   * @param distance distance of movement of movingRect
   * @returns in case of a collision this method will return the movingRect moved for the max distance that will not
   *          cause a collision. It will return null of there is no collision of the two given Rectangles.
   */
  static stopMovementOnCollision = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    direction: Directions,
    distance: Point
  ): Rectangle | null => {
    let collision: Point | null;
    switch (direction) {
      case Directions.Up:
        // TODO: When stillRect.width < movingRect.width: do reverse check
        collision = CollisionDetector.getCollisionForMovementUp(
          movingRect,
          stillRect,
          distance
        );
        return collision
          ? new Rectangle(
              movingRect.x,
              collision.y,
              movingRect.width,
              movingRect.height
            )
          : null;
      case Directions.Down:
        // TODO: When stillRect.width < movingRect.width: do reverse check
        collision = CollisionDetector.getCollisionForMovementDown(
          movingRect,
          stillRect,
          distance
        );
        return collision
          ? new Rectangle(
              movingRect.x,
              collision.y - movingRect.height,
              movingRect.width,
              movingRect.height
            )
          : null;
      case Directions.Left:
        // TODO: When stillRect.width < movingRect.width: do reverse check
        collision = CollisionDetector.getCollisionForMovementLeft(
          movingRect,
          stillRect,
          distance
        );
        return collision
          ? new Rectangle(
              collision.x,
              movingRect.y,
              movingRect.width,
              movingRect.height
            )
          : null;
      case Directions.Right:
        // TODO: When stillRect.width < movingRect.width: do reverse check
        collision = CollisionDetector.getCollisionForMovementRight(
          movingRect,
          stillRect,
          distance
        );
        return collision
          ? new Rectangle(
              collision.x - movingRect.width,
              movingRect.y,
              movingRect.width,
              movingRect.height
            )
          : null;
      default:
        return null;
    }
  };

  private static checkCollisionOnCardinalDirection(
    provider: CollisionCheckForCardinalDirection
  ): Point | null {
    let collision: Point | null;
    const line = provider.getLine();
    collision = line.getIntersection(provider.getFirstVector());
    if (!collision) {
      collision = line.getIntersection(provider.getSecondVector());
    }
    return collision;
  }

  static getCollisionForMovementUp = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnCardinalDirection({
      getLine: stillRect.getBottomBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y },
          { x: movingRect.x, y: movingRect.y + distance.y }
        );
      },
      getSecondVector(): Line {
        return new Line(
          { x: movingRect.x + movingRect.width, y: movingRect.y },
          {
            x: movingRect.x + movingRect.width + distance.x,
            y: movingRect.y + distance.y,
          }
        );
      },
    });
  };

  static getCollisionForMovementDown = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnCardinalDirection({
      getLine: stillRect.getTopBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y + movingRect.height },
          {
            x: movingRect.x + distance.x,
            y: movingRect.y + movingRect.height + distance.y,
          }
        );
      },
      getSecondVector(): Line {
        return new Line(
          {
            x: movingRect.x + movingRect.width,
            y: movingRect.y + movingRect.height,
          },
          {
            x: movingRect.x + movingRect.width + distance.x,
            y: movingRect.y + movingRect.height + distance.y,
          }
        );
      },
    });
  };

  static getCollisionForMovementLeft = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnCardinalDirection({
      getLine: stillRect.getRightBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y },
          { x: movingRect.x + distance.x, y: movingRect.y }
        );
      },
      getSecondVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y + movingRect.height },
          {
            x: movingRect.x + distance.x,
            y: movingRect.y + movingRect.height,
          }
        );
      },
    });
  };

  static getCollisionForMovementRight = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnCardinalDirection({
      getLine: stillRect.getLeftBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x + movingRect.width, y: movingRect.y },
          { x: movingRect.x + movingRect.width + distance.x, y: movingRect.y }
        );
      },
      getSecondVector(): Line {
        return new Line(
          {
            x: movingRect.x + movingRect.width,
            y: movingRect.y + movingRect.height,
          },
          {
            x: movingRect.x + movingRect.width + distance.x,
            y: movingRect.y + movingRect.height,
          }
        );
      },
    });
  };
}
