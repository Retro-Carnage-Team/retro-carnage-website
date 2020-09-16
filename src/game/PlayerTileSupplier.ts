import Tile from "./Tile";
import { Player } from "./Player";
import { Directions } from "./Directions";
import PlayerBehavior from "./PlayerBehavior";
import {
  PlayerTileSet,
  TileSetForPlayer0,
  TileSetForPlayer1,
} from "./PlayerTileSets";
import TileGenerator from "./TileGenerator";

export const DURATION_OF_MOVEMENT_ANIMATION = 75; // in ms
export const DURATION_OF_DEATH_ANIMATION_PLAYER_0 = 75 * 21; // in ms
export const DURATION_OF_DEATH_ANIMATION_PLAYER_1 = 75 * 26; // in ms

export default class PlayerTileSupplier {
  directionOfLastTile: Directions | null;
  durationSinceLastTile: number;
  invincibilityToggle: boolean;
  lastTile?: Tile;
  tileGenerator: TileGenerator | null;
  tileSet: PlayerTileSet;

  constructor(player: Player) {
    this.directionOfLastTile = null;
    this.durationSinceLastTile = 0;
    this.invincibilityToggle = true;
    this.tileGenerator = null;
    this.tileSet = 0 === player.index ? TileSetForPlayer0 : TileSetForPlayer1;
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
