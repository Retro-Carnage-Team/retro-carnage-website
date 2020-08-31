import Rectangle from "./Rectangle";
import { EXPLOSION_HIT_RECT_HEIGHT, EXPLOSION_HIT_RECT_WIDTH } from "./Engine";
import ExplosionTileSupplier from "./ExplosionTileSupplier";

export interface SomethingThatGoesBoom {
  playerIdx: number | null;
  position: Rectangle;
}

export default class Explosion {
  duration: number;
  readonly playerIdx: number | null;
  position: Rectangle;
  readonly tileSupplier: ExplosionTileSupplier;

  constructor(explosive: SomethingThatGoesBoom) {
    this.duration = 0;
    this.playerIdx = explosive.playerIdx;
    this.position = new Rectangle(
      Math.round(
        explosive.position.x +
          explosive.position.width / 2 -
          EXPLOSION_HIT_RECT_WIDTH / 2
      ),
      Math.round(
        explosive.position.y +
          explosive.position.height -
          EXPLOSION_HIT_RECT_HEIGHT
      ),
      EXPLOSION_HIT_RECT_WIDTH,
      EXPLOSION_HIT_RECT_HEIGHT
    );
    this.tileSupplier = new ExplosionTileSupplier();
  }
}
