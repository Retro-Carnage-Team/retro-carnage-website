import Point from "./Point";

export default class Line {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  getIntersection = (other: Line): Point | null => {
    const a =
      ((other.end.x - other.start.x) * (this.start.y - other.start.y) -
        (other.end.y - other.start.y) * (this.start.x - other.start.x)) /
      ((other.end.y - other.start.y) * (this.end.x - this.start.x) -
        (other.end.x - other.start.x) * (this.end.y - this.start.y));
    const b =
      ((this.end.x - this.start.x) * (this.start.y - other.start.y) -
        (this.end.y - this.start.y) * (this.start.x - other.start.x)) /
      ((other.end.y - other.start.y) * (this.end.x - this.start.x) -
        (other.end.x - other.start.x) * (this.end.y - this.start.y));
    if (a >= 0 && a <= 1 && b >= 0 && b <= 1) {
      const intersectionX = this.start.x + a * (this.end.x - this.start.x);
      const intersectionY = this.start.y + a * (this.end.y - this.start.y);
      return { x: intersectionX, y: intersectionY };
    }
    return null;
  };

  getLengthFromStartToPoint = (point: Point): number => {
    const a = Math.abs(this.start.x - point.x);
    const b = Math.abs(this.start.y - point.y);
    return Math.sqrt(a * a + b * b);
  };

  // Lines do not have a direction: check both possibilities
  equals = (other: Line): boolean => {
    function pointToString(p: Point): string {
      return `${p.x}/${p.y}`;
    }

    if (!other) {
      return false;
    }

    const thisStart = pointToString(this.start);
    const otherStart = pointToString(other.start);
    const thisEnd = pointToString(this.end);
    const otherEnd = pointToString(other.end);

    return (
      (thisStart === otherStart && thisEnd === otherEnd) ||
      (thisEnd === otherStart && thisStart === otherEnd)
    );
  };
}
