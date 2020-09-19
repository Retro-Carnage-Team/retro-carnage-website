import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import EnemyTileSupplier, {
  LandmineTileSupplier,
  TileSupplier,
} from "./EnemyTileSupplier";
import { EnemySkins } from "./EnemySkins";
import Tile from "./Tile";

export enum EnemyType {
  Person,
  Landmine,
}

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
  dying: boolean;
  dyingAnimationCountDown: number;
  movements: EnemyMovement[];
  position: Rectangle;
  readonly skin: EnemySkins | null;
  readonly viewingDirection: Directions | null;
  readonly type: EnemyType;

  constructor(
    activationDistance: number,
    movements: EnemyMovement[],
    position: Rectangle,
    skin: EnemySkins | null,
    viewingDirection: Directions | null,
    type: EnemyType
  ) {
    this.activationDistance = activationDistance;
    this.dying = false;
    this.dyingAnimationCountDown = 0;
    this.movements = movements;
    this.position = position;
    this.skin = skin;
    this.viewingDirection = viewingDirection;
    this.type = type;
  }
}

export class ActiveEnemy {
  readonly enemy: Enemy;
  readonly tileSupplier: TileSupplier;

  constructor(enemy: Enemy) {
    this.enemy = enemy;
    this.tileSupplier = {
      getTile: (): Tile | undefined => undefined,
    };

    if (null !== enemy.viewingDirection && EnemyType.Person === enemy.type) {
      this.tileSupplier = new EnemyTileSupplier(
        enemy.skin!,
        enemy.viewingDirection
      );
    }

    if (EnemyType.Landmine === enemy.type) {
      this.tileSupplier = new LandmineTileSupplier();
    }
  }
}
