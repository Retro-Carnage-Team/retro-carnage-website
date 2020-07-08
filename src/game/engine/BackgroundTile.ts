import Tile from './Tile';

export const SCREEN_SIZE = 1500;

export default class BackgroundTile extends Tile {

  constructor(path: string, offsetX: number, offsetY: number) {
    super(path, SCREEN_SIZE, SCREEN_SIZE, offsetX, offsetY);
  }

}
