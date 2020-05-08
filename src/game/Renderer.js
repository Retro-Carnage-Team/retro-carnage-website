export default class Renderer {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  render = (elapsedTimeInMs) => {
    const height = this.canvas.height;
    const width = this.canvas.width;

    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);
    
    this.ctx.restore();
  }

}