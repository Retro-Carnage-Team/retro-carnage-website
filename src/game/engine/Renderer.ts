import PlayerController from "../PlayerController";
import PlayerTileSupplier from "./PlayerTileSupplier";
import Rectangle from "./Rectangle";
import Engine, { SCREEN_SIZE } from "./Engine";

export default class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  engine: Engine;
  playerTileSuppliers: PlayerTileSupplier[];

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.engine = engine;
    this.playerTileSuppliers = PlayerController.getConfiguredPlayers().map(
      (player) => new PlayerTileSupplier(player)
    );
  }

  render = (elapsedTimeInMs: number) => {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);

      this.drawBackground();
      this.drawPlayers(elapsedTimeInMs);
      this.drawExplosives();
      this.drawExplosions(elapsedTimeInMs);

      this.ctx.restore();
    }
  };

  drawBackground = () => {
    const backgroundRect = new Rectangle(0, 0, SCREEN_SIZE, SCREEN_SIZE);
    this.engine.getBackgrounds().forEach((bg) => {
      const translatedPosition = bg.translate(backgroundRect);
      const canvas = bg.getCanvas();
      if (canvas && this.ctx) {
        this.ctx.drawImage(canvas, translatedPosition.x, translatedPosition.y);
      }
    });
  };

  drawPlayers = (elapsedTimeInMs: number) => {
    const positions = this.engine.playerPositions;
    const behaviors = this.engine.playerBehaviors;
    PlayerController.getRemainingPlayers().forEach((player) => {
      const tile = this.playerTileSuppliers[player.index].getTile(
        elapsedTimeInMs,
        behaviors[player.index]
      );
      if (tile) {
        const translatedPosition = tile.translate(positions[player.index]);
        const canvas = tile.getCanvas();
        if (canvas && this.ctx) {
          this.ctx.drawImage(
            canvas,
            translatedPosition.x,
            translatedPosition.y
          );
        }
      }
    });
  };

  drawExplosives = () => {
    this.engine.explosives.forEach((explosive) => {
      const canvas = explosive.tile.getCanvas();
      if (canvas && this.ctx) {
        this.ctx.drawImage(canvas, explosive.position.x, explosive.position.y);
      }
    });
  };

  drawExplosions = (elapsedTimeInMs: number) => {
    this.engine.explosions.forEach((explosion) => {
      const tile = explosion.tileSupplier.getTile(elapsedTimeInMs);
      const canvas = tile.getCanvas();
      if (canvas && this.ctx) {
        this.ctx.drawImage(canvas, explosion.position.x, explosion.position.y);
      }
    });
  };
}
