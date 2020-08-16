import Rectangle from "./Rectangle";
import Point from "./Point";
import { Directions } from "./Directions";
import Line from "./Line";

interface CollisionCheckForCardinalDirection {
  getBorder(): Line;
  getFirstVector(): Line;
  getSecondVector(): Line;
}

interface CollisionCheckForDiagonalDirection {
  getFirstBorder(): Line;
  getSecondBorder(): Line;
  getFirstVector(): Line;
  getSecondVector(): Line;
  getThirdVector(): Line;
}

interface DiagonalCollisionSet {
  distance: Point;
  length: number;
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
    switch (direction) {
      case Directions.Up:
        return CollisionDetector.stopUpMovement(
          movingRect,
          stillRect,
          distance
        );
      case Directions.UpRight:
        return CollisionDetector.stopUpRightMovement(
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
      case Directions.DownRight:
        return CollisionDetector.stopDownRightMovement(
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
      case Directions.DownLeft:
        return CollisionDetector.stopDownLeftMovement(
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
      case Directions.UpLeft:
        return CollisionDetector.stopUpLeftMovement(
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
    const line = provider.getBorder();
    collision = line.getIntersection(provider.getFirstVector());
    if (!collision) {
      collision = line.getIntersection(provider.getSecondVector());
    }
    return collision;
  }

  private static checkCollisionOnDiagonalDirection(
    provider: CollisionCheckForDiagonalDirection
  ): Point | null {
    let collisions: DiagonalCollisionSet[] = [];

    const borders = [provider.getFirstBorder(), provider.getSecondBorder()];
    const vectors = [
      provider.getFirstVector(),
      provider.getSecondVector(),
      provider.getThirdVector(),
    ];

    vectors.forEach((v) => {
      let collision: Point | null = null;
      borders.forEach((b) => {
        if (!collision) {
          collision = b.getIntersection(v);
        }
      });
      if (collision) {
        const a = Math.abs(v.start.x - collision.x);
        const b = Math.abs(v.start.y - collision.y);
        const length = Math.sqrt(a * a + b * b);
        collisions.push({
          distance: { x: collision.x - v.start.x, y: collision.y - v.start.y },
          length,
        });
      }
    });
    collisions = collisions.sort((a, b) => a.length - b.length);
    return collisions.length > 0 ? collisions[0].distance : null;
  }

  static getCollisionForMovementUp = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnCardinalDirection({
      getBorder: stillRect.getBottomBorder,
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

  static stopUpRightMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null => {
    const maxUpRightMovement = CollisionDetector.getMaxUpRightMovement(
      movingRect,
      stillRect,
      distance
    );

    if (maxUpRightMovement) {
      return movingRect.add(maxUpRightMovement);
    }

    if (
      stillRect.width < movingRect.width ||
      stillRect.height < movingRect.height
    ) {
      const maxDownLeftMovement = CollisionDetector.getMaxDownLeftMovement(
        stillRect,
        movingRect,
        {
          x: -1 * distance.x,
          y: -1 * distance.y,
        }
      );
      if (maxDownLeftMovement) {
        return new Rectangle(
          movingRect.x + -1 * maxDownLeftMovement.x,
          movingRect.y + -1 * maxDownLeftMovement.y,
          movingRect.width,
          movingRect.height
        );
      }
    }

    return null;
  };

  static stopDownRightMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null => {
    const maxDownRightMovement = CollisionDetector.getMaxDownRightMovement(
      movingRect,
      stillRect,
      distance
    );

    if (maxDownRightMovement) {
      return movingRect.add(maxDownRightMovement);
    }

    if (
      stillRect.width < movingRect.width ||
      stillRect.height < movingRect.height
    ) {
      const maxUpLeftMovement = CollisionDetector.getMaxUpLeftMovement(
        stillRect,
        movingRect,
        {
          x: -1 * distance.x,
          y: -1 * distance.y,
        }
      );
      if (maxUpLeftMovement) {
        return new Rectangle(
          movingRect.x + -1 * maxUpLeftMovement.x,
          movingRect.y + -1 * maxUpLeftMovement.y,
          movingRect.width,
          movingRect.height
        );
      }
    }

    return null;
  };

  static stopDownLeftMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null => {
    const maxDownLeftMovement = CollisionDetector.getMaxDownLeftMovement(
      movingRect,
      stillRect,
      distance
    );

    if (maxDownLeftMovement) {
      return movingRect.add(maxDownLeftMovement);
    }

    if (
      stillRect.width < movingRect.width ||
      stillRect.height < movingRect.height
    ) {
      const maxUpRightMovement = CollisionDetector.getMaxUpRightMovement(
        stillRect,
        movingRect,
        {
          x: -1 * distance.x,
          y: -1 * distance.y,
        }
      );
      if (maxUpRightMovement) {
        return new Rectangle(
          movingRect.x + -1 * maxUpRightMovement.x,
          movingRect.y + -1 * maxUpRightMovement.y,
          movingRect.width,
          movingRect.height
        );
      }
    }

    return null;
  };

  static stopUpLeftMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Rectangle | null => {
    const maxUpLeftMovement = CollisionDetector.getMaxUpLeftMovement(
      movingRect,
      stillRect,
      distance
    );

    if (maxUpLeftMovement) {
      return movingRect.add(maxUpLeftMovement);
    }

    if (
      stillRect.width < movingRect.width ||
      stillRect.height < movingRect.height
    ) {
      const maxDownRightMovement = CollisionDetector.getMaxDownRightMovement(
        stillRect,
        movingRect,
        {
          x: -1 * distance.x,
          y: -1 * distance.y,
        }
      );
      if (maxDownRightMovement) {
        return new Rectangle(
          movingRect.x + -1 * maxDownRightMovement.x,
          movingRect.y + -1 * maxDownRightMovement.y,
          movingRect.width,
          movingRect.height
        );
      }
    }

    return null;
  };

  static getMaxUpRightMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnDiagonalDirection({
      getFirstBorder: stillRect.getLeftBorder,
      getSecondBorder: stillRect.getBottomBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y },
          { x: movingRect.x + distance.x, y: movingRect.y + distance.y }
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
      getThirdVector(): Line {
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

  static getMaxDownRightMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnDiagonalDirection({
      getFirstBorder: stillRect.getLeftBorder,
      getSecondBorder: stillRect.getTopBorder,
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
      getThirdVector(): Line {
        return new Line(
          {
            x: movingRect.x + movingRect.width,
            y: movingRect.y,
          },
          {
            x: movingRect.x + movingRect.width + distance.x,
            y: movingRect.y + distance.y,
          }
        );
      },
    });
  };

  static getMaxDownLeftMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnDiagonalDirection({
      getFirstBorder: stillRect.getRightBorder,
      getSecondBorder: stillRect.getTopBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y },
          {
            x: movingRect.x + distance.x,
            y: movingRect.y + distance.y,
          }
        );
      },
      getSecondVector(): Line {
        return new Line(
          {
            x: movingRect.x,
            y: movingRect.y + movingRect.height,
          },
          {
            x: movingRect.x + distance.x,
            y: movingRect.y + movingRect.height + distance.y,
          }
        );
      },
      getThirdVector(): Line {
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

  static getMaxUpLeftMovement = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    return CollisionDetector.checkCollisionOnDiagonalDirection({
      getFirstBorder: stillRect.getRightBorder,
      getSecondBorder: stillRect.getBottomBorder,
      getFirstVector(): Line {
        return new Line(
          { x: movingRect.x, y: movingRect.y },
          {
            x: movingRect.x + distance.x,
            y: movingRect.y + distance.y,
          }
        );
      },
      getSecondVector(): Line {
        return new Line(
          {
            x: movingRect.x,
            y: movingRect.y + movingRect.height,
          },
          {
            x: movingRect.x + distance.x,
            y: movingRect.y + movingRect.height + distance.y,
          }
        );
      },
      getThirdVector(): Line {
        return new Line(
          {
            x: movingRect.x + movingRect.width,
            y: movingRect.y,
          },
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
      getBorder: stillRect.getTopBorder,
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
      getBorder: stillRect.getRightBorder,
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
      getBorder: stillRect.getLeftBorder,
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
