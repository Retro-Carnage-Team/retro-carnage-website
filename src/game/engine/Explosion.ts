import Rectangle from './Rectangle';
import { EXPLOSION_HIT_RECT_HEIGHT, EXPLOSION_HIT_RECT_WIDTH } from './Engine';
import ExplosionTileSupplier from './ExplosionTileSupplier';
import Explosive, { GRENADE_HEIGHT, GRENADE_WIDTH } from './Explosive';

export default class Explosion {

  duration: number;
  position: Rectangle;
  tileSupplier: ExplosionTileSupplier;

  constructor(explosive: Explosive) {
    this.duration = 0;
    this.position = new Rectangle(
      Math.round(explosive.position.x + (GRENADE_WIDTH / 2) - (EXPLOSION_HIT_RECT_WIDTH / 2)),
      Math.round(explosive.position.y + GRENADE_HEIGHT - EXPLOSION_HIT_RECT_HEIGHT),
      EXPLOSION_HIT_RECT_WIDTH,
      EXPLOSION_HIT_RECT_HEIGHT
    );
    this.tileSupplier = new ExplosionTileSupplier();
  }

}
