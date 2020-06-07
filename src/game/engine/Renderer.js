import PlayerController from '../PlayerController';
import PlayerTileSupplier from './PlayerTileSupplier';
import Rectangle from './Rectangle';
import { SCREEN_SIZE } from './Engine';
import ExplosionTileSupplier from './ExplosionTileSupplier';

export default class Renderer {

  constructor(canvas, engine) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.engine = engine;
    this.playerTileSuppliers = PlayerController.getConfiguredPlayers()
      .map((player) => new PlayerTileSupplier(player));
  }

  render = (elapsedTimeInMs) => {
    this.ctx.save();
    this.ctx.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);

    this.drawBackground();
    this.drawPlayers(elapsedTimeInMs);
    // this.drawEnemies();
    this.drawExplosions(elapsedTimeInMs);

    this.ctx.restore();
  }

  drawBackground = () => {
    const backgroundRect = new Rectangle(0, 0, SCREEN_SIZE, SCREEN_SIZE);
    this.engine.backgrounds.forEach((bg) => {
      const translatedPosition = bg.translate(backgroundRect);
      const canvas = bg.getCanvas();
      if(canvas) {
        this.ctx.drawImage(canvas, translatedPosition.x, translatedPosition.y);
      }
    });
  }

  drawPlayers = (elapsedTimeInMs) => {
    const positions = this.engine.playerPositions;
    const behaviors = this.engine.playerBehaviors;
    PlayerController.getRemainingPlayers().forEach((player) => {
      const tile = this.playerTileSuppliers[player.index].getTile(elapsedTimeInMs, behaviors[player.index]);
      const translatedPosition = tile.translate(positions[player.index]);
      const canvas = tile.getCanvas();
      if(canvas) {
        this.ctx.drawImage(canvas, translatedPosition.x, translatedPosition.y);
      }
    });
  }

  drawExplosions = (elapsedTimeInMs) => {
    this.engine.explosions.forEach((explosion) => {
      if(!explosion.tileSupplier) {
        explosion.tileSupplier = new ExplosionTileSupplier();
      }
      const tile = explosion.tileSupplier.getTile(elapsedTimeInMs);
      const canvas = tile.getCanvas();
      if(canvas) {
        this.ctx.drawImage(canvas, explosion.x, explosion.y);
      }
    });
  }

}