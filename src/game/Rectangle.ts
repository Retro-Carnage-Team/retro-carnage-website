import Point from "./Point";
import Line from "./Line";

export default class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  add = (offset: Point): Rectangle => {
    this.x += offset.x;
    this.y += offset.y;
    return this;
  };

  subtract = (offset: Point): Rectangle => {
    this.x -= offset.x;
    this.y -= offset.y;
    return this;
  };

  getIntersection = (other: Rectangle): Rectangle | null => {
    const leftX = Math.max(this.x, other.x);
    const rightX = Math.min(this.x + this.width, other.x + other.width);
    const topY = Math.max(this.y, other.y);
    const bottomY = Math.min(this.y + this.height, other.y + other.height);
    if (leftX < rightX && topY < bottomY) {
      return new Rectangle(leftX, topY, rightX - leftX, bottomY - topY);
    }
    return null;
  };

  getLeftBorder = (): Line => {
    return new Line(
      { x: this.x, y: this.y },
      { x: this.x, y: this.y + this.height }
    );
  };

  getRightBorder = (): Line => {
    return new Line(
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height }
    );
  };

  getTopBorder = (): Line => {
    return new Line(
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y }
    );
  };

  getBottomBorder = (): Line => {
    return new Line(
      { x: this.x, y: this.y + this.height },
      { x: this.x + this.width, y: this.y + this.height }
    );
  };

  toString = (): string => {
    return `Rectangle[x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}]`;
  };
}
