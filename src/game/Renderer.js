export default class Renderer {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  render = (elapsedTimeInMs) => {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'lightyellow';
    this.ctx.strokeStyle = 'brown';
    this.ctx.font = '60px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(elapsedTimeInMs, this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.strokeText(elapsedTimeInMs, this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.restore();
  }

}