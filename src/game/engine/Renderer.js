import PlayerController from '../PlayerController';
import PlayerTileSupplier from './PlayerTileSupplier';

export default class Renderer {

  constructor(canvas, engine) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.engine = engine;
    this.playerTileSuppliers = PlayerController.getConfiguredPlayers()
      .map((player) => new PlayerTileSupplier(player));
  }

  render = (elapsedTimeInMs) => {
    const height = this.canvas.height;
    const width = this.canvas.width;

    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);

    // this.drawBackground();
    this.drawPlayers(elapsedTimeInMs);
    // this.drawEnemies();
    // this.drawAnimations();

    this.ctx.restore();
  }

  drawPlayers = (elapsedTimeInMs) => {
    const positions = this.engine.playerPositions;
    const behaviors = this.engine.playerBehaviors;
    PlayerController.getRemainingPlayers().forEach((player) => {
      const tile = this.playerTileSuppliers[player.index].getTile(elapsedTimeInMs, behaviors[player.index]);
      const translatedPosition = tile.translate(positions[player.index]);
      this.ctx.drawImage(tile.getCanvas(), translatedPosition.x, translatedPosition.y);
    });
  }

}