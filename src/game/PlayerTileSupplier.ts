import Tile from "./Tile";
import { Player } from "./Player";
import { Directions } from "./Directions";
import PlayerBehavior from "./PlayerBehavior";
import TileGenerator from "./TileGenerator";

export const DURATION_OF_MOVEMENT_ANIMATION = 75; // in ms
export const DURATION_OF_DEATH_ANIMATION = 75 * 26; // in ms

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
  idle: Map<Directions, Tile>;
}

function buildTileSetForPlayer1(): TileSet {
  const result: TileSet = {
    byDirection: new Map<Directions, Tile[]>(),
    death: buildAnimationSeries(
      26,
      135,
      200,
      "images/tiles/player-1/death/",
      -30,
      0
    ),
    idle: new Map<Directions, Tile>(),
  };

  result.byDirection.set(
    Directions.Down,
    buildAnimationSeries(6, 94, 200, "images/tiles/player-1/down/", -2, 0)
  );
  result.byDirection.set(
    Directions.DownLeft,
    buildAnimationSeries(
      6,
      154,
      200,
      "images/tiles/player-1/down_left/",
      -48,
      0
    )
  );
  result.byDirection.set(
    Directions.DownRight,
    buildAnimationSeries(6, 88, 200, "images/tiles/player-1/down_right/", 1, 0)
  );
  result.byDirection.set(
    Directions.Left,
    buildAnimationSeries(6, 160, 200, "images/tiles/player-1/left/", -33, 0)
  );
  result.byDirection.set(
    Directions.Right,
    buildAnimationSeries(6, 155, 200, "images/tiles/player-1/right/", 0, 0)
  );
  result.byDirection.set(
    Directions.Up,
    buildAnimationSeries(6, 85, 200, "images/tiles/player-1/up/", 2, 0)
  );
  result.byDirection.set(
    Directions.UpLeft,
    buildAnimationSeries(6, 100, 200, "images/tiles/player-1/up_left/", 0, 0)
  );
  result.byDirection.set(
    Directions.UpRight,
    buildAnimationSeries(6, 126, 200, "images/tiles/player-1/up_right/", 0, 0)
  );

  result.idle.set(
    Directions.Down,
    new Tile("images/tiles/player-1/idle/down.png", 100, 200, -5, 0)
  );
  result.idle.set(
    Directions.DownLeft,
    new Tile("images/tiles/player-1/idle/down_left.png", 127, 200, -37, 0)
  );
  result.idle.set(
    Directions.DownRight,
    new Tile("images/tiles/player-1/idle/down_right.png", 108, 200, 6, 0)
  );
  result.idle.set(
    Directions.Left,
    new Tile("images/tiles/player-1/idle/left.png", 112, 200, -22, 0)
  );
  result.idle.set(
    Directions.Right,
    new Tile("images/tiles/player-1/idle/right.png", 131, 200, 0, 0)
  );
  result.idle.set(
    Directions.Up,
    new Tile("images/tiles/player-1/idle/up.png", 94, 200, -2, 0)
  );
  result.idle.set(
    Directions.UpLeft,
    new Tile("images/tiles/player-1/idle/up_left.png", 85, 200, 2, 0)
  );
  result.idle.set(
    Directions.UpRight,
    new Tile("images/tiles/player-1/idle/up_right.png", 125, 200, 0, 0)
  );

  return result;
}

const TILES_PLAYER_1 = buildTileSetForPlayer1();

export default class PlayerTileSupplier {
  directionOfLastTile: Directions | null;
  durationSinceLastTile: number;
  invincibilityToggle: boolean;
  lastTile?: Tile;
  tileGenerator: TileGenerator | null;
  tileSet: TileSet;

  constructor(player: Player) {
    this.directionOfLastTile = null;
    this.durationSinceLastTile = 0;
    this.invincibilityToggle = true;
    this.tileGenerator = null;
    this.tileSet = 0 === player.index ? TILES_PLAYER_1 : TILES_PLAYER_1; // TODO: Create tileSet for player 2
  }

  getTile = (
    elapsedTimeInMs: number,
    playerBehavior: PlayerBehavior
  ): Tile | undefined => {
    if (playerBehavior.dying || playerBehavior.moving) {
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
      if (playerBehavior.dying) {
        if (null !== this.directionOfLastTile) {
          this.directionOfLastTile = null;
          this.tileGenerator = new TileGenerator(this.tileSet.death);
          newTile = true;
        }
      } else {
        if (this.directionOfLastTile !== playerBehavior.direction) {
          this.directionOfLastTile = playerBehavior.direction;
          this.tileGenerator = new TileGenerator(
            this.tileSet.byDirection.get(playerBehavior.direction)
          );
          newTile = true;
        }
      }
      if (newTile) {
        this.lastTile = this.tileGenerator?.nextValue();
      }
      if (playerBehavior.invincible) {
        this.invincibilityToggle = !this.invincibilityToggle;
        return this.invincibilityToggle ? this.lastTile : undefined;
      }
      return this.lastTile;
    } else {
      if (playerBehavior.invincible) {
        this.invincibilityToggle = !this.invincibilityToggle;
        return this.invincibilityToggle
          ? this.tileSet.idle.get(playerBehavior.direction)
          : undefined;
      }
      return this.tileSet.idle.get(playerBehavior.direction);
    }
  };
}
