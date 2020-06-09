import { getMovementX, getMovementY, getMovementDistance } from './Movement';
import Rectangle from './Rectangle';
import Tile from './Tile';

const GRENADE_HEIGHT = 17;
const GRENADE_WIDTH = 32;

// Explosives are Grenades and RPG ammo that has been fired by the player.
export default class Explosive {

  constructor(playerPosition, playerBehavior, selectedWeapon) {
    this.distanceMoved = 0;
    this.distanceToTarget = selectedWeapon.range;
    this.direction = playerBehavior.direction;
    this.speed = selectedWeapon.speed;

    // TODO: This is top/left of player position
    //       Should start center of player with a little offset in movement direction
    this.position = new Rectangle(playerPosition.x, playerPosition.y, GRENADE_WIDTH, GRENADE_HEIGHT);
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