import { getMovementDistance, getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import Tile from "./Tile";
import { Directions } from "./Directions";
import Offset from "./Offset";
import PlayerBehavior from "./PlayerBehavior";
import { Grenade } from "../Grenades";

export const GRENADE_HEIGHT = 17;
export const GRENADE_WIDTH = 32;

const Offsets = new Map<Directions, Offset>();
Offsets.set(Directions.Up, { x: 45, y: -GRENADE_HEIGHT });
Offsets.set(Directions.UpRight, { x: 45, y: -GRENADE_HEIGHT });
Offsets.set(Directions.Right, { x: 90, y: 100 });
Offsets.set(Directions.DownRight, { x: 90, y: 100 });
Offsets.set(Directions.Down, { x: 45, y: 200 });
Offsets.set(Directions.DownLeft, { x: -GRENADE_WIDTH, y: 100 });
Offsets.set(Directions.Left, { x: -GRENADE_WIDTH, y: 100 });
Offsets.set(Directions.UpLeft, { x: 0, y: -GRENADE_HEIGHT });

// Explosives are Grenades and RPG ammo that has been fired by the player.
export default class Explosive {
  distanceMoved: number;
  distanceToTarget: number;
  direction: Directions;
  speed: number;
  position: Rectangle;
  tile: Tile;

  constructor(
    playerPosition: Rectangle,
    playerBehavior: PlayerBehavior,
    selectedWeapon: Grenade
  ) {
    this.distanceMoved = 0;
    this.distanceToTarget = selectedWeapon.range;
    this.direction = playerBehavior.direction;
    this.speed = selectedWeapon.speed;
    const offset = Offsets.get(this.direction);
    this.position = new Rectangle(
      playerPosition.x + (offset ? offset.x : 0),
      playerPosition.y + (offset ? offset.y : 0),
      GRENADE_WIDTH,
      GRENADE_HEIGHT
    );
    this.tile = new Tile(
      "images/tiles/weapons/grenade.png",
      GRENADE_WIDTH,
      GRENADE_HEIGHT,
      0,
      0
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
        this.speed,
        maxDistance
      );
      this.position.x += getMovementX(
        elapsedTimeInMs,
        this.direction,
        this.speed,
        maxDistance
      );
      this.position.y += getMovementY(
        elapsedTimeInMs,
        this.direction,
        this.speed,
        maxDistance
      );
    }
    return this.distanceMoved >= this.distanceToTarget;
  };
}
