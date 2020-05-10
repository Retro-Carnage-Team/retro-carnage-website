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
      this.offScreenCanvas = this.renderToOffScreenCanvas();
    }
    return this.offScreenCanvas;
  }

  renderToOffScreenCanvas = () => {
    const canvas = window.document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const context = canvas.getContext('2d');
    context.drawImage(this.image, 0, 0);
    return canvas;
  }

}
