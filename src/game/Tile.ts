import Rectangle from "./Rectangle";

export const SCREEN_SIZE = 1500;

export default abstract class Tile {
  protected constructor(public offsetX: number, public offsetY: number) {}

  abstract getCanvas(): CanvasImageSource | null;

  translate = (position: Rectangle): Rectangle => {
    return new Rectangle(
      position.x + this.offsetX,
      position.y + this.offsetY,
      position.width,
      position.height
    );
  };
}

export class ImageTile extends Tile {
  public readonly path: string;
  public readonly imageHeight: number;
  public readonly imageWidth: number;
  private readonly image: HTMLImageElement | null;
  private offScreenCanvas: HTMLCanvasElement | null;

  constructor(
    path: string,
    imageWidth: number,
    imageHeight: number,
    offsetX: number,
    offsetY: number
  ) {
    super(offsetX, offsetY);

    this.path = path;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    if ("" !== path) {
      this.image = new Image(imageWidth, imageHeight);
      this.image.src = this.path;
    } else {
      this.image = null;
    }
    this.offScreenCanvas = null;
  }

  getCanvas = (): CanvasImageSource | null => {
    if (!this.offScreenCanvas && this.image?.complete) {
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
}

export class BackgroundTile extends ImageTile {
  constructor(path: string, offsetX: number, offsetY: number) {
    super(path, SCREEN_SIZE, SCREEN_SIZE, offsetX, offsetY);
  }
}

export class ComputedTile extends Tile {
  private readonly canvas: CanvasImageSource;

  constructor(baseTile: Tile, canvas: CanvasImageSource) {
    super(baseTile.offsetX, baseTile.offsetY);
    this.canvas = canvas;
  }

  getCanvas = (): CanvasImageSource | null => {
    return this.canvas;
  };
}
