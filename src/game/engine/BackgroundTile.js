import Tile from './Tile';

export const SCREEN_SIZE = 1500;

export default class BackgroundTile extends Tile {

  constructor(path) {
    super(path, SCREEN_SIZE, SCREEN_SIZE, 0, 0);
  }

}
