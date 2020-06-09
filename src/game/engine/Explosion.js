import Rectangle from './Rectangle';
import {EXPLOSION_HIT_RECT_HEIGHT, EXPLOSION_HIT_RECT_WIDTH} from './Engine';
import ExplosionTileSupplier from './ExplosionTileSupplier';

export default class Explosion {

  constructor(explosive) {
    this.duration = 0;
    this.position = new Rectangle(
      explosive.position.x,
      explosive.position.y,
      EXPLOSION_HIT_RECT_WIDTH,
      EXPLOSION_HIT_RECT_HEIGHT
    );
    this.tileSupplier = new ExplosionTileSupplier();
  }

}