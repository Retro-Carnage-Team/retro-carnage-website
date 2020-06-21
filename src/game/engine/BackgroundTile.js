import Tile from './Tile';

export const SCREEN_SIZE = 1500;

export default class BackgroundTile extends Tile {

  constructor(path, offsetX, offsetY) {
    super(path, SCREEN_SIZE, SCREEN_SIZE, offsetX, offsetY);
  }

}
