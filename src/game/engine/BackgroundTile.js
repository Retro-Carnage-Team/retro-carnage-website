import Rectangle from './Rectangle';
import { renderToOffScreenCanvas, SCREEN_SIZE } from './Tiles';

export default class BackgroundTile {

  constructor(path) {
    this.path = path;
    this.offsetX = 0;
    this.offsetY = 0;

    this.image = new Image(SCREEN_SIZE, SCREEN_SIZE);
    this.image.loading = 'eager';
    this.image.src = this.path;

    this.offScreenCanvas = null;
  }

  getCanvas = () => {
    if(!this.offScreenCanvas && this.image.complete) {
      this.offScreenCanvas = renderToOffScreenCanvas(this.image, SCREEN_SIZE, SCREEN_SIZE);
    }
    return this.offScreenCanvas;
  }

  translate = (position) => {
    return new Rectangle(position.x + this.offsetX, position.y + this.offsetY, position.width, position.height);
  }

}
