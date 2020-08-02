import Tile from "./Tile";
import { Directions } from "./Directions";
import { EnemySkins } from "./EnemySkins";
import TileGenerator from "./TileGenerator";

export const DURATION_OF_MOVEMENT_ANIMATION = 75; // in ms

function buildAnimationSeries(
  count: number,
  w: number,
  h: number,
  folder: string,
  offsetX: number,
  offsetY: number
): Tile[] {
  let result: Tile[] = [];
  for (let i = 0; i < count; i++) {
    result.push(new Tile(`${folder}${i + 1}.png`, w, h, offsetX, offsetY));
  }
  return result;
}

interface TileSet {
  byDirection: Map<Directions, Tile[]>;
  death: Tile[];
}

function buildTileSetForEnemy1(): TileSet {
  const result: TileSet = {
    byDirection: new Map<Directions, Tile[]>(),
    death: buildAnimationSeries(
      26,
      135,
      200,
      "images/tiles/enemy-1/death/",
      -30,
      0
    ),
  };

  result.byDirection.set(
    Directions.Down,
    buildAnimationSeries(6, 94, 200, "images/tiles/enemy-1/down/", -2, 0)
  );
  result.byDirection.set(
    Directions.Left,
    buildAnimationSeries(6, 160, 200, "images/tiles/enemy-1/left/", -33, 0)
  );
  result.byDirection.set(
    Directions.Right,
    buildAnimationSeries(6, 155, 200, "images/tiles/enemy-1/right/", 0, 0)
  );

  return result;
}

const tileSetsByEnemySkin: Map<EnemySkins, TileSet> = new Map();
tileSetsByEnemySkin.set(
  EnemySkins.GREY_ONESIE_WITH_HELMET,
  buildTileSetForEnemy1()
);

export default class EnemyTileSupplier {
  direction: Directions;
  durationSinceLastTile: number;
  lastTile?: Tile;
  tileGenerator: TileGenerator | null;
  tileSet: TileSet | undefined;

  constructor(skin: EnemySkins, direction: Directions) {
    this.direction = direction;
    this.durationSinceLastTile = 0;
    this.tileSet = tileSetsByEnemySkin.get(skin);
    this.tileGenerator = null;
  }

  getTile = (elapsedTimeInMs: number): Tile | undefined => {
    if (null === this.tileGenerator && this.tileSet) {
      this.tileGenerator = new TileGenerator(
        this.tileSet.byDirection.get(this.direction)
      );
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
