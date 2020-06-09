import { getMovementX, getMovementY, getMovementDistance } from './Movement';
import Rectangle from './Rectangle';
import Tile from './Tile';

export const GRENADE_HEIGHT = 17;
export const GRENADE_WIDTH = 32;

const Offsets = {
  'up': { x: 45, y: -GRENADE_HEIGHT },
  'up_right': { x: 45, y: -GRENADE_HEIGHT },
  'right': { x: 90, y: 100 },
  'down_right': { x: 90, y: 100 },
  'down': { x: 45, y: 200 },
  'down_left': { x: -GRENADE_WIDTH, y: 100 },
  'left': { x: -GRENADE_WIDTH, y: 100 },
  'up_left': { x: 0, y: -GRENADE_HEIGHT }
};

// Explosives are Grenades and RPG ammo that has been fired by the player.
export default class Explosive {

  constructor(playerPosition, playerBehavior, selectedWeapon) {
    this.distanceMoved = 0;
    this.distanceToTarget = selectedWeapon.range;
    this.direction = playerBehavior.direction;
    this.speed = selectedWeapon.speed;
    const offset = Offsets[this.direction];
    this.position = new Rectangle(
      playerPosition.x + offset.x,
      playerPosition.y + offset.y,
      GRENADE_WIDTH,
      GRENADE_HEIGHT
    );
    this.tile = new Tile('images/tiles/weapons/grenade.png', GRENADE_WIDTH, GRENADE_HEIGHT, 0, 0);
  }

  /*
    Moves the explosive.
    Returns true if the explosive reached it's destination
   */
  move = (elapsedTimeInMs) => {
    if(this.distanceMoved < this.distanceToTarget) {
      const maxDistance = this.distanceToTarget - this.distanceMoved;
      this.distanceMoved += getMovementDistance(elapsedTimeInMs, this.speed, maxDistance);
      this.position.x += getMovementX(elapsedTimeInMs, this.direction, this.speed, maxDistance);
      this.position.y += getMovementY(elapsedTimeInMs, this.direction, this.speed, maxDistance);
    }
    return this.distanceMoved >= this.distanceToTarget;
  }

}