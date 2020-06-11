import Tile from './Tile';

export const DURATION_OF_FRAME = 25;            // in ms
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

export default class ExplosionTileSupplier {

  constructor() {
    this.duration = 0;
  }

  getTile = (elapsedTimeInMs) => {
    this.duration += elapsedTimeInMs;
    const idx = Math.floor(this.duration / DURATION_OF_FRAME);
    return TILES[Math.min(TILES.length -1, idx)];
  }

}
