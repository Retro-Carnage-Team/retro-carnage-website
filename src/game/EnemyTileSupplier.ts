import Tile from "./Tile";
import { Directions } from "./Directions";
import { EnemySkins } from "./EnemySkins";
import TileGenerator from "./TileGenerator";

export const DURATION_OF_MOVEMENT_ANIMATION = 75; // in ms
export const DURATION_OF_DEATH_ANIMATION_ENEMY = 75 * 20; // in ms

function buildAnimationSeries(
  count: number,
  w: number,
  h: number,
  folder: string,
  offsetX: number,
  offsetY: number,
  direction: Directions
): Tile[] {
  let result: Tile[] = [];
  for (let i = 0; i < count; i++) {
    result.push(
      new Tile(`${folder}/${direction}/${i + 1}.png`, w, h, offsetX, offsetY)
    );
  }
  return result;
}

function buildTileSetForEnemy0(): Map<Directions, Tile[]> {
  const result = new Map<Directions, Tile[]>();
  const folder = "images/tiles/enemy-0";
  result.set(
    Directions.Down,
    buildAnimationSeries(6, 94, 200, folder, -2, -30, Directions.Down)
  );
  result.set(
    Directions.DownLeft,
    buildAnimationSeries(6, 162, 200, folder, -40, -30, Directions.DownLeft)
  );
  result.set(
    Directions.DownRight,
    buildAnimationSeries(6, 142, 200, folder, -45, -30, Directions.DownRight)
  );
  result.set(
    Directions.Left,
    buildAnimationSeries(6, 151, 200, folder, -30, -30, Directions.Left)
  );
  result.set(
    Directions.Right,
    buildAnimationSeries(6, 192, 200, folder, -63, -30, Directions.Right)
  );
  result.set(
    Directions.UpLeft,
    buildAnimationSeries(6, 105, 200, folder, -10, -30, Directions.UpLeft)
  );
  result.set(
    Directions.UpRight,
    buildAnimationSeries(6, 148, 200, folder, -30, -30, Directions.UpRight)
  );
  return result;
}

function buildTileSetForEnemy1(): Map<Directions, Tile[]> {
  const result = new Map<Directions, Tile[]>();
  const folder = "images/tiles/enemy-1";
  result.set(
    Directions.Down,
    buildAnimationSeries(6, 85, 200, folder, -3, -30, Directions.Down)
  );
  result.set(
    Directions.DownLeft,
    buildAnimationSeries(6, 159, 200, folder, -55, -34, Directions.DownLeft)
  );
  result.set(
    Directions.DownRight,
    buildAnimationSeries(6, 94, 200, folder, -5, -30, Directions.DownRight)
  );
  result.set(
    Directions.Left,
    buildAnimationSeries(6, 174, 200, folder, -55, -30, Directions.Left)
  );
  result.set(
    Directions.Right,
    buildAnimationSeries(6, 163, 200, folder, -30, -30, Directions.Right)
  );
  result.set(
    Directions.UpLeft,
    buildAnimationSeries(6, 101, 200, folder, -5, -30, Directions.UpLeft)
  );
  result.set(
    Directions.UpRight,
    buildAnimationSeries(6, 150, 200, folder, -20, -30, Directions.UpRight)
  );
  return result;
}

const tileSetsByEnemySkin: Map<EnemySkins, Map<Directions, Tile[]>> = new Map();
tileSetsByEnemySkin.set(EnemySkins.WOODLAND_WITH_SMG, buildTileSetForEnemy0());
tileSetsByEnemySkin.set(
  EnemySkins.GREY_ONESIE_WITH_RIFLE,
  buildTileSetForEnemy1()
);

export interface TileSupplier {
  getTile(elapsedTimeInMs: number): Tile | undefined;
}

export class LandmineTileSupplier implements TileSupplier {
  private readonly tile = new Tile(
    "images/tiles/environment/Tellermine-43.png",
    50,
    44,
    0,
    0
  );
  getTile = (): Tile | undefined => this.tile;
}

export default class EnemyTileSupplier implements TileSupplier {
  direction: Directions;
  durationSinceLastTile: number;
  lastTile?: Tile;
  tileGenerator: TileGenerator | null;
  tileSet: Map<Directions, Tile[]> | undefined;

  constructor(skin: EnemySkins, direction: Directions) {
    this.direction = direction;
    this.durationSinceLastTile = 0;
    this.tileSet = tileSetsByEnemySkin.get(skin);
    this.tileGenerator = null;
  }

  getTile = (elapsedTimeInMs: number): Tile | undefined => {
    if (null === this.tileGenerator && this.tileSet) {
      this.tileGenerator = new TileGenerator(this.tileSet.get(this.direction));
    }

    let newTile = false;
    if (
      DURATION_OF_MOVEMENT_ANIMATION <=
      this.durationSinceLastTile + elapsedTimeInMs
    ) {
      this.durationSinceLastTile = 0;
      newTile = true;
    } else {
      this.durationSinceLastTile += elapsedTimeInMs;
    }
    if (newTile) {
      this.lastTile = this.tileGenerator?.nextValue();
    }
    return this.lastTile;
  };
}
