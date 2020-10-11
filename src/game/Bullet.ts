import { getMovementDistance, getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import Point from "./Point";
import { Weapon } from "./Weapons";

export const BULLET_HEIGHT = 5;
export const BULLET_WIDTH = 5;
const BULLET_SPEED = 1.2; // TODO: get bullet speed from weapon

function buildBulletOffsetForPlayer0(): Map<Directions, Point> {
  const result = new Map<Directions, Point>();
  result.set(Directions.Up, { x: 80, y: -BULLET_HEIGHT });
  result.set(Directions.UpRight, { x: 105, y: 0 });
  result.set(Directions.Right, { x: 126, y: 43 });
  result.set(Directions.DownRight, { x: 103, y: 100 });
  result.set(Directions.Down, { x: 14, y: 185 });
  result.set(Directions.DownLeft, { x: -20, y: 70 });
  result.set(Directions.Left, { x: -15, y: 3 });
  result.set(Directions.UpLeft, { x: -BULLET_WIDTH, y: -20 });
  return result;
}

function buildBulletOffsetForPlayer1(): Map<Directions, Point> {
  const result = new Map<Directions, Point>();
  result.set(Directions.Up, { x: 87, y: -(BULLET_HEIGHT + 40) });
  result.set(Directions.UpRight, { x: 116, y: 9 });
  result.set(Directions.Right, { x: 135, y: 52 });
  result.set(Directions.DownRight, { x: 98, y: 100 });
  result.set(Directions.Down, { x: 16, y: 160 });
  result.set(Directions.DownLeft, { x: -(BULLET_WIDTH + 20), y: 57 });
  result.set(Directions.Left, { x: -BULLET_WIDTH, y: 12 });
  result.set(Directions.UpLeft, { x: -BULLET_WIDTH, y: -13 });
  return result;
}

export const BulletOffsetForPlayer0 = buildBulletOffsetForPlayer0();
export const BulletOffsetForPlayer1 = buildBulletOffsetForPlayer1();

// Explosives are Grenades and RPG ammo that has been fired by the player.
export default class Bullet {
  distanceMoved: number;
  distanceToTarget: number;
  direction: Directions;
  playerIdx: number | null;
  position: Rectangle;

  constructor(
    playerIdx: number | null,
    playerPosition: Rectangle,
    direction: Directions,
    selectedWeapon: Weapon
  ) {
    this.distanceMoved = 0;
    this.distanceToTarget = selectedWeapon.range;
    this.direction = direction;
    this.playerIdx = playerIdx;
    this.position = new Rectangle(
      playerPosition.x,
      playerPosition.y,
      BULLET_WIDTH,
      BULLET_HEIGHT
    );
  }

  applyOffset = (offset: Map<Directions, Point>) => {
    const offsetValue = offset.get(this.direction);
    if (offsetValue) {
      this.position.add(offsetValue);
    }
  };

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
