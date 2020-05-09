import PlayerTile from './PlayerTile';

export const DURATION_OF_MOVEMENT_ANIMATION = 75;  // in ms

function buildAnimationSeries(count, w, h, folder, offsetX, offsetY) {
  let result = [];
  for(let i=0; i<count; i++) {
    result.push(new PlayerTile(w, h, `${folder}${i +1}.png`, offsetX, offsetY));
  }
  return result;
}

const TILES_PLAYER_1 = {
  down: buildAnimationSeries(6, 94, 200, 'images/tiles/player-1/down/', 0, 0),
  down_left: buildAnimationSeries(6, 154, 200, 'images/tiles/player-1/down_left/', 0, 0),
  down_right: buildAnimationSeries(6, 88, 200, 'images/tiles/player-1/down_right/', 0, 0),
  idle: {
    down: new PlayerTile(100, 200, 'images/tiles/player-1/idle/down.png', 0, 0),
    down_left: new PlayerTile(127, 200, 'images/tiles/player-1/idle/down_left.png', 0, 0),
    down_right: new PlayerTile(108, 200, 'images/tiles/player-1/idle/down_right.png', 0, 0),
    left: new PlayerTile(112, 200, 'images/tiles/player-1/idle/left.png', 0, 0),
    right: new PlayerTile(131, 200, 'images/tiles/player-1/idle/right.png', 0, 0),
    up: new PlayerTile(94, 200, 'images/tiles/player-1/idle/up.png', 0, 0),
    up_left: new PlayerTile(85, 200, 'images/tiles/player-1/idle/up_left.png', 0, 0),
    up_right: new PlayerTile(125, 200, 'images/tiles/player-1/idle/up_right.png', 0, 0)
  },
  left: buildAnimationSeries(6, 160, 200, 'images/tiles/player-1/left/', 0, 0),
  right: buildAnimationSeries(6, 155, 200, 'images/tiles/player-1/right/', 0, 0),
  up: buildAnimationSeries(6, 85, 200, 'images/tiles/player-1/up/', 0, 0),
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
