export default class Renderer {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  render = (elapsedTimeInMs) => {
    const height = this.canvas.height;
    const width = this.canvas.width;

    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);
    
    this.ctx.restore();
  }

}