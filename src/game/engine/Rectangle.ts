export default class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

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
}
