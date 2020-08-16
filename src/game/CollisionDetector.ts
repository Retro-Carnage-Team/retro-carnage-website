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
        return CollisionDetector.stopUpMovement(
          movingRect,
          stillRect,
          distance
        );
      case Directions.Down:
        return CollisionDetector.stopDownMovement(
          movingRect,
          stillRect,
          distance
        );
      case Directions.Left:
        return CollisionDetector.stopLeftMovement(
          movingRect,
          stillRect,
          distance
        );
      case Directions.Right:
        return CollisionDetector.stopRightMovement(
          movingRect,
          stillRect,
          distance
        );
      default:
        return null;
    }
  };

  private static stopUpMovement(
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null {
    let collision = CollisionDetector.getCollisionForMovementUp(
      movingRect,
      stillRect,
      distance
    );

    if (collision) {
      return new Rectangle(
        movingRect.x,
        collision.y,
        movingRect.width,
        movingRect.height
      );
    }

    if (
      stillRect.width < movingRect.width &&
      CollisionDetector.getCollisionForMovementDown(stillRect, movingRect, {
        x: 0,
        y: -1 * distance.y,
      })
    ) {
      return new Rectangle(
        movingRect.x,
        stillRect.y + stillRect.height,
        movingRect.width,
        movingRect.height
      );
    }

    return null;
  }

  private static stopDownMovement(
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null {
    let collision = CollisionDetector.getCollisionForMovementDown(
      movingRect,
      stillRect,
      distance
    );

    if (collision) {
      return new Rectangle(
        movingRect.x,
        collision.y - movingRect.height,
        movingRect.width,
        movingRect.height
      );
    }

    if (
      stillRect.width < movingRect.width &&
      CollisionDetector.getCollisionForMovementUp(stillRect, movingRect, {
        x: 0,
        y: -1 * distance.y,
      })
    ) {
      return new Rectangle(
        movingRect.x,
        stillRect.y - movingRect.height,
        movingRect.width,
        movingRect.height
      );
    }

    return null;
  }

  private static stopLeftMovement(
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null {
    let collision = CollisionDetector.getCollisionForMovementLeft(
      movingRect,
      stillRect,
      distance
    );

    if (collision) {
      return new Rectangle(
        collision.x,
        movingRect.y,
        movingRect.width,
        movingRect.height
      );
    }

    if (
      stillRect.height < movingRect.height &&
      CollisionDetector.getCollisionForMovementRight(stillRect, movingRect, {
        x: -1 * distance.x,
        y: 0,
      })
    ) {
      return new Rectangle(
        stillRect.x + stillRect.width,
        movingRect.y,
        movingRect.width,
        movingRect.height
      );
    }

    return null;
  }

  private static stopRightMovement(
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null {
    let collision = CollisionDetector.getCollisionForMovementRight(
      movingRect,
      stillRect,
      distance
    );

    if (collision) {
      return new Rectangle(
        collision.x - movingRect.width,
        movingRect.y,
        movingRect.width,
        movingRect.height
      );
    }

    if (
      stillRect.height < movingRect.height &&
      CollisionDetector.getCollisionForMovementLeft(stillRect, movingRect, {
        x: -1 * distance.x,
        y: 0,
      })
    ) {
      return new Rectangle(
        stillRect.x - movingRect.width,
        movingRect.y,
        movingRect.width,
        movingRect.height
      );
    }

    return null;
  }

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
