import Tile from './Tile';

export const DURATION_OF_FRAME = 25;  // in ms
const FOLDER = 'images/tiles/explosion';
const NUMBER_OF_TILES = 48;
const IMAGE_SIZE = 200;

function buildAnimationSeries() {
  let result = [];
  for(let i=0; i<NUMBER_OF_TILES; i++) {
    result.push(new Tile(`${FOLDER}/${i}.png`, IMAGE_SIZE, IMAGE_SIZE, 0, 0));
  }
  return result;
}

const TILES = buildAnimationSeries();

function* tileGenerator() {
  let index = 0;
  while (true) {
    yield TILES[index];
    index = (index +1) % TILES.length;
  }
}

export default class ExplosionTileSupplier {

  constructor() {
    this.durationSinceLastTile = 0;
    this.lastTile = null;
    this.tileGenerator = tileGenerator();
  }

  getTile = (elapsedTimeInMs) => {
    if(!this.lastTile || DURATION_OF_FRAME <= this.durationSinceLastTile + elapsedTimeInMs) {
      this.durationSinceLastTile = 0;
      this.lastTile = this.tileGenerator.next().value;
    } else {
      this.durationSinceLastTile += elapsedTimeInMs;
    }
    return this.lastTile;
  }

}
