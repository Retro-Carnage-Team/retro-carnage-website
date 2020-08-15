import Rectangle from "./Rectangle";
import Point from "./Point";
import { Directions } from "./Directions";
import Line from "./Line";

export default class CollisionDetector {
  /**
   * Checks for a possible collision of rectangles movingRect and stillRect when movingRect gets moved into direction by
   * the specified distance.
   *
   * @param movingRect the rectangle that gets moved
   * @param stillRect another rectangle that doesn't move
   * @param direction direction of movement of movingRect
   * @param distance distance of movement of movingRect
   * @returns in case of a collision this method will return the max distance that will not cause a collision. It will
   *          return null of there is no collision of the two given Rectangles.
   */
  static getCollision = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    direction: Directions,
    distance: Point
  ): Point | null => {
    switch (direction) {
      case Directions.Up:
        // TODO: Calculate and return the max distance instead of the collision point
        // TODO: When stillRect.width < movingRect.width: do reverse check
        return CollisionDetector.getCollisionForMovementUp(
          movingRect,
          stillRect,
          distance
        );
      case Directions.Down:
        // TODO: Calculate and return the max distance instead of the collision point
        // TODO: When stillRect.width < movingRect.width: do reverse check
        return CollisionDetector.getCollisionForMovementDown(
          movingRect,
          stillRect,
          distance
        );
      default:
        return null;
    }
  };

  static getCollisionForMovementUp = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    let collision: Point | null;
    const bottomBorder = stillRect.getBottomBorder();

    const leftVector = new Line(
      { x: movingRect.x, y: movingRect.y },
      { x: movingRect.x + distance.x, y: movingRect.y + distance.y }
    );
    collision = bottomBorder.getIntersection(leftVector);

    if (!collision) {
      const rightVector = new Line(
        { x: movingRect.x + movingRect.width, y: movingRect.y },
        {
          x: movingRect.x + movingRect.width + distance.x,
          y: movingRect.y + distance.y,
        }
      );
      collision = bottomBorder.getIntersection(rightVector);
    }

    return collision;
  };

  static getCollisionForMovementDown = (
    movingRect: Rectangle,
    stillRect: Rectangle,
    distance: Point
  ): Point | null => {
    let collision: Point | null;
    const topBorder = stillRect.getTopBorder();

    const leftVector = new Line(
      { x: movingRect.x, y: movingRect.y + movingRect.height },
      {
        x: movingRect.x + distance.x,
        y: movingRect.y + movingRect.height + distance.y,
      }
    );
    collision = topBorder.getIntersection(leftVector);

    if (!collision) {
      const rightVector = new Line(
        {
          x: movingRect.x + movingRect.width,
          y: movingRect.y + movingRect.height,
        },
        {
          x: movingRect.x + movingRect.width + distance.x,
          y: movingRect.y + movingRect.height + distance.y,
        }
      );
      collision = topBorder.getIntersection(rightVector);
    }

    return collision;
  };
}
