import Rectangle from "./Rectangle";

export default class Tile {
  path: string;
  offsetX: number;
  offsetY: number;
  imageHeight: number;
  imageWidth: number;
  image: HTMLImageElement;
  offScreenCanvas: HTMLCanvasElement | null;

  constructor(
    path: string,
    imageWidth: number,
    imageHeight: number,
    offsetX: number,
    offsetY: number
  ) {
    this.path = path;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.image = new Image(imageWidth, imageHeight);
    this.image.src = this.path;
    this.offScreenCanvas = null;
  }

  getCanvas = () => {
    if (!this.offScreenCanvas && this.image.complete) {
      this.offScreenCanvas = window.document.createElement("canvas");
      this.offScreenCanvas.width = this.imageWidth;
      this.offScreenCanvas.height = this.imageHeight;
      const context = this.offScreenCanvas.getContext("2d");
      if (context) {
        context.drawImage(this.image, 0, 0);
      }
    }
    return this.offScreenCanvas;
  };

  translate = (position: Rectangle): Rectangle => {
    return new Rectangle(
      position.x + this.offsetX,
      position.y + this.offsetY,
      position.width,
      position.height
    );
  };
}
