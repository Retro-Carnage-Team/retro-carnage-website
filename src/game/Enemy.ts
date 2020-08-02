import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import EnemyTileSupplier from "./EnemyTileSupplier";
import { EnemySkins } from "./EnemySkins";

/**
 * Enemy movements are not based on coordinates but on time and speed.
 * This keeps the required calculation nice and simple.
 */
interface EnemyMovement {
  duration: number;
  offsetXPerMs: number;
  offsetYPerMs: number;
  timeElapsed: number;
}

export default class Enemy {
  activationDistance: number;
  readonly dying: boolean;
  movements: EnemyMovement[];
  position: Rectangle;
  readonly skin: EnemySkins;
  readonly viewingDirection: Directions;

  constructor(
    activationDistance: number,
    movements: EnemyMovement[],
    position: Rectangle,
    skin: EnemySkins,
    viewingDirection: Directions
  ) {
    this.activationDistance = activationDistance;
    this.dying = false;
    this.movements = movements;
    this.position = position;
    this.skin = skin;
    this.viewingDirection = viewingDirection;
  }
}

export class ActiveEnemy {
  readonly enemy: Enemy;
  readonly tileSupplier: EnemyTileSupplier;

  constructor(enemy: Enemy, viewingDirection: Directions) {
    this.enemy = enemy;
    this.tileSupplier = new EnemyTileSupplier(enemy.skin, viewingDirection);
  }
}
