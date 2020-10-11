import { getMovementDistance, getMovementX, getMovementY } from "./Movement";
import Rectangle from "./Rectangle";
import Tile, { ImageTile } from "./Tile";
import { Directions } from "./Directions";
import Point from "./Point";
import { Grenade } from "./Grenades";
import { Weapon } from "./Weapons";

export const GRENADE_HEIGHT = 17;
export const GRENADE_WIDTH = 32;

export const RPG_HEIGHT = 10;
export const RPG_WIDTH = 10;

export interface ExplosiveTileSupplier {
  getTile(): Tile;
}

export default abstract class Explosive {
  protected constructor(
    public distanceMoved: number,
    private readonly distanceToTarget: number,
    private readonly direction: Directions,
    public readonly playerIdx: number | null,
    public readonly position: Rectangle,
    private readonly speed: number,
    public readonly tileSupplier: ExplosiveTileSupplier
  ) {}

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

export class GrenadeTileSupplier implements ExplosiveTileSupplier {
  private static grenadeTile = new ImageTile(
    "images/tiles/weapons/grenade.png",
    GRENADE_WIDTH,
    GRENADE_HEIGHT,
    0,
    0
  );

  getTile(): Tile {
    return GrenadeTileSupplier.grenadeTile;
  }
}

export class ExplosiveGrenade extends Explosive {
  private static offsets = ((): Map<Directions, Point> => {
    const result = new Map<Directions, Point>();
    result.set(Directions.Up, { x: 45, y: -GRENADE_HEIGHT });
    result.set(Directions.UpRight, { x: 45, y: -GRENADE_HEIGHT });
    result.set(Directions.Right, { x: 90, y: 100 });
    result.set(Directions.DownRight, { x: 90, y: 100 });
    result.set(Directions.Down, { x: 45, y: 200 });
    result.set(Directions.DownLeft, { x: -GRENADE_WIDTH, y: 100 });
    result.set(Directions.Left, { x: -GRENADE_WIDTH, y: 100 });
    result.set(Directions.UpLeft, { x: 0, y: -GRENADE_HEIGHT });
    return result;
  })();

  constructor(
    playerIdx: number | null,
    playerPosition: Rectangle,
    direction: Directions,
    selectedWeapon: Grenade
  ) {
    super(
      0,
      selectedWeapon.range,
      direction,
      playerIdx,
      new Rectangle(
        playerPosition.x + ExplosiveGrenade.offsets.get(direction)!.x,
        playerPosition.y + ExplosiveGrenade.offsets.get(direction)!.y,
        GRENADE_WIDTH,
        GRENADE_HEIGHT
      ),
      selectedWeapon.speed,
      new GrenadeTileSupplier()
    );
  }
}

export class RPGTileSupplier implements ExplosiveTileSupplier {
  private readonly tiles: Tile[];
  private lastIdx = 0;

  constructor(direction: Directions) {
    this.tiles = RPGTileSupplier.tiles.get(direction)!;
  }

  getTile(): Tile {
    this.lastIdx = (this.lastIdx + 1) % 2;
    return this.tiles[this.lastIdx];
  }

  private static readonly tiles = ((): Map<Directions, Tile[]> => {
    function getPath(dir: Directions, index: number): string {
      return `images/tiles/weapons/rpg-${dir}-${index}.png`;
    }

    const result = new Map<Directions, Tile[]>();
    result.set(Directions.Up, [
      new ImageTile(getPath(Directions.Up, 1), 20, 106, -5, 0),
      new ImageTile(getPath(Directions.Up, 2), 20, 106, -5, 0),
    ]);
    result.set(Directions.UpRight, [
      new ImageTile(getPath(Directions.UpRight, 1), 80, 80, -70, 0),
      new ImageTile(getPath(Directions.UpRight, 2), 80, 80, -70, 0),
    ]);
    result.set(Directions.Right, [
      new ImageTile(getPath(Directions.Right, 1), 106, 20, -96, -5),
      new ImageTile(getPath(Directions.Right, 2), 106, 20, -96, -5),
    ]);
    result.set(Directions.DownRight, [
      new ImageTile(getPath(Directions.DownRight, 1), 80, 80, -70, -70),
      new ImageTile(getPath(Directions.DownRight, 2), 80, 80, -70, -70),
    ]);
    result.set(Directions.Down, [
      new ImageTile(getPath(Directions.Down, 1), 20, 106, -5, -96),
      new ImageTile(getPath(Directions.Down, 2), 20, 106, -5, -96),
    ]);
    result.set(Directions.DownLeft, [
      new ImageTile(getPath(Directions.DownLeft, 1), 80, 80, 0, -70),
      new ImageTile(getPath(Directions.DownLeft, 2), 80, 80, 0, -70),
    ]);
    result.set(Directions.Left, [
      new ImageTile(getPath(Directions.Left, 1), 106, 20, 0, -5),
      new ImageTile(getPath(Directions.Left, 2), 106, 20, 0, -5),
    ]);
    result.set(Directions.UpLeft, [
      new ImageTile(getPath(Directions.UpLeft, 1), 80, 80, 0, 0),
      new ImageTile(getPath(Directions.UpLeft, 2), 80, 80, 0, 0),
    ]);
    return result;
  })();
}

const RPGOffsetForPlayer0 = ((): Map<Directions, Point> => {
  const result = new Map<Directions, Point>();
  result.set(Directions.Up, { x: 80, y: -RPG_HEIGHT });
  result.set(Directions.UpRight, { x: 110, y: -45 });
  result.set(Directions.Right, { x: 131, y: 43 });
  result.set(Directions.DownRight, { x: 113, y: 110 });
  result.set(Directions.Down, { x: 14, y: 195 });
  result.set(Directions.DownLeft, { x: -120, y: 80 });
  result.set(Directions.Left, { x: -25, y: 3 });
  result.set(Directions.UpLeft, { x: -RPG_WIDTH, y: -20 });
  return result;
})();

const RPGOffsetForPlayer1 = ((): Map<Directions, Point> => {
  const result = new Map<Directions, Point>();
  result.set(Directions.Up, { x: 87, y: -(RPG_HEIGHT + 40) });
  result.set(Directions.UpRight, { x: 126, y: 9 });
  result.set(Directions.Right, { x: 145, y: 52 });
  result.set(Directions.DownRight, { x: 108, y: 110 });
  result.set(Directions.Down, { x: 16, y: 170 });
  result.set(Directions.DownLeft, { x: -(RPG_WIDTH + 20), y: 67 });
  result.set(Directions.Left, { x: -RPG_WIDTH, y: 12 });
  result.set(Directions.UpLeft, { x: -RPG_WIDTH, y: -13 });
  return result;
})();

export class ExplosiveRPG extends Explosive {
  constructor(
    playerIdx: number | null,
    playerPosition: Rectangle,
    direction: Directions,
    selectedWeapon: Weapon
  ) {
    super(
      0,
      selectedWeapon.range,
      direction,
      playerIdx,
      new Rectangle(
        playerPosition.x +
          ExplosiveRPG.getOffsetXForPlayer(playerIdx, direction),
        playerPosition.y +
          ExplosiveRPG.getOffsetYForPlayer(playerIdx, direction),
        RPG_WIDTH,
        RPG_HEIGHT
      ),
      selectedWeapon.bulletSpeed,
      new RPGTileSupplier(direction)
    );
  }

  private static getOffsetXForPlayer = (
    playerIdx: number | null,
    direction: Directions
  ): number => {
    if (null === playerIdx) return 0;
    return [RPGOffsetForPlayer0, RPGOffsetForPlayer1][playerIdx].get(direction)!
      .x;
  };

  private static getOffsetYForPlayer = (
    playerIdx: number | null,
    direction: Directions
  ): number => {
    if (null === playerIdx) return 0;
    return [RPGOffsetForPlayer0, RPGOffsetForPlayer1][playerIdx].get(direction)!
      .y;
  };
}
