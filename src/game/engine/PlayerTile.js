import Rectangle from './Rectangle';

function renderToOffScreenCanvas(image, width, height) {
  const canvas = window.document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  return canvas;
}

export default class PlayerTile {

  constructor(width, height, path, offsetX, offsetY) {
    this.width = width;
    this.height = height;
    this.path = path;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.image = new Image(this.width, this.height);
    this.image.loading = 'eager';
    this.image.src = this.path;

    this.offScreenCanvas = null;
  }

  getCanvas = () => {
    if(!this.offScreenCanvas && this.image.complete) {
      this.offScreenCanvas = renderToOffScreenCanvas(this.image, this.width, this.height);
    }
    return this.offScreenCanvas;
  }

  translate = (position) => {
    return new Rectangle(position.x + this.offsetX, position.y + this.offsetY, position.width, position.height);
  }

}
