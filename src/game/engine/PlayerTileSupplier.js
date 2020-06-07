import Tile from './Tile';

export const DURATION_OF_MOVEMENT_ANIMATION = 75;  // in ms

function buildAnimationSeries(count, w, h, folder, offsetX, offsetY) {
  let result = [];
  for(let i=0; i<count; i++) {
    result.push(new Tile(`${folder}${i +1}.png`, w, h, offsetX, offsetY));
  }
  return result;
}

const TILES_PLAYER_1 = {
  down: buildAnimationSeries(6, 94, 200, 'images/tiles/player-1/down/', -2, 0),
  down_left: buildAnimationSeries(6, 154, 200, 'images/tiles/player-1/down_left/', -48, 0),
  down_right: buildAnimationSeries(6, 88, 200, 'images/tiles/player-1/down_right/', 1, 0),
  idle: {
    down: new Tile('images/tiles/player-1/idle/down.png', 100, 200, -5, 0),
    down_left: new Tile('images/tiles/player-1/idle/down_left.png', 127, 200, -37, 0),
    down_right: new Tile('images/tiles/player-1/idle/down_right.png', 108, 200, 6, 0),
    left: new Tile('images/tiles/player-1/idle/left.png', 112, 200, -22, 0),
    right: new Tile('images/tiles/player-1/idle/right.png', 131, 200, 0, 0),
    up: new Tile('images/tiles/player-1/idle/up.png', 94, 200, -2, 0),
    up_left: new Tile('images/tiles/player-1/idle/up_left.png', 85, 200, 2, 0),
    up_right: new Tile('images/tiles/player-1/idle/up_right.png', 125, 200, 0, 0)
  },
  left: buildAnimationSeries(6, 160, 200, 'images/tiles/player-1/left/', -33, 0),
  right: buildAnimationSeries(6, 155, 200, 'images/tiles/player-1/right/', 0, 0),
  up: buildAnimationSeries(6, 85, 200, 'images/tiles/player-1/up/', 2, 0),
  up_left: buildAnimationSeries(6, 100, 200, 'images/tiles/player-1/up_left/', 0, 0),
  up_right: buildAnimationSeries(6, 126, 200, 'images/tiles/player-1/up_right/', 0, 0)
};

function* tileGenerator(tiles) {
  let index = 0;
  while (true) {
    yield tiles[index];
    index = (index +1) % tiles.length;
  }
}

export default class PlayerTileSupplier {

  constructor(player) {
    this.directionOfLastTile = null;
    this.durationSinceLastTile = 0;
    this.lastTile = null;
    this.tileGenerator = null;
    // TODO: Create tileSet for player 2
    this.tileSet = 0 === player.index ? TILES_PLAYER_1 : TILES_PLAYER_1;
  }

  getTile = (elapsedTimeInMs, playerBehavior) => {
    if(playerBehavior.moving) {
      let newTile = false;
      if(DURATION_OF_MOVEMENT_ANIMATION <= this.durationSinceLastTile + elapsedTimeInMs) {
        this.durationSinceLastTile = 0;
        newTile = true;
      } else {
        this.durationSinceLastTile += elapsedTimeInMs;
      }
      if(this.directionOfLastTile !== playerBehavior.direction) {
        this.directionOfLastTile = playerBehavior.direction;
        this.tileGenerator = tileGenerator(this.tileSet[playerBehavior.direction]);
        newTile = true;
      }
      if(newTile) {
        this.lastTile = this.tileGenerator.next().value;
      }
      return this.lastTile;
    } else {
      return this.tileSet.idle[playerBehavior.direction];
    }
  }

}
