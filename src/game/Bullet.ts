import { getMovementDistance, getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import Offset from "./Offset";
import PlayerBehavior from "./PlayerBehavior";
import { Weapon } from "./Weapons";

export const BULLET_HEIGHT = 5;
export const BULLET_WIDTH = 5;
const BULLET_SPEED = 1.2;

const Offsets = new Map<Directions, Offset>();
Offsets.set(Directions.Up, { x: 45, y: -BULLET_HEIGHT });
Offsets.set(Directions.UpRight, { x: 45, y: -BULLET_HEIGHT });
Offsets.set(Directions.Right, { x: 90, y: 100 });
Offsets.set(Directions.DownRight, { x: 90, y: 100 });
Offsets.set(Directions.Down, { x: 45, y: 200 });
Offsets.set(Directions.DownLeft, { x: -BULLET_WIDTH, y: 100 });
Offsets.set(Directions.Left, { x: -BULLET_WIDTH, y: 100 });
Offsets.set(Directions.UpLeft, { x: 0, y: -BULLET_HEIGHT });

// Explosives are Grenades and RPG ammo that has been fired by the player.
export default class Bullet {
  distanceMoved: number;
  distanceToTarget: number;
  direction: Directions;
  position: Rectangle;

  constructor(
    playerPosition: Rectangle,
    playerBehavior: PlayerBehavior,
    selectedWeapon: Weapon
  ) {
    this.distanceMoved = 0;
    this.distanceToTarget = selectedWeapon.range;
    this.direction = playerBehavior.direction;
    const offset = Offsets.get(this.direction);
    this.position = new Rectangle(
      playerPosition.x + (offset ? offset.x : 0),
      playerPosition.y + (offset ? offset.y : 0),
      BULLET_WIDTH,
      BULLET_HEIGHT
    );
  }

  /*
      Moves the explosive.
      Returns true if the explosive reached it's destination
     */
  move = (elapsedTimeInMs: number): boolean => {
    if (this.distanceMoved < this.distanceToTarget) {
      const maxDistance = this.distanceToTarget - this.distanceMoved;
      this.distanceMoved += getMovementDistance(
        elapsedTimeInMs,
        BULLET_SPEED,
        maxDistance
      );
      this.position.x += getMovementX(
        elapsedTimeInMs,
        this.direction,
        BULLET_SPEED,
        maxDistance
      );
      this.position.y += getMovementY(
        elapsedTimeInMs,
        this.direction,
        BULLET_SPEED,
        maxDistance
      );
    }
    return this.distanceMoved >= this.distanceToTarget;
  };
}
