import Tile from "./Tile";

export default class TileGenerator {
  private index: number;
  private iterator: IterableIterator<Tile>;
  private readonly tiles?: Tile[];

  constructor(tiles?: Tile[]) {
    this.tiles = tiles;
    this.index = 0;
    this.iterator = this.generator();
  }

  nextValue = (): Tile => {
    return this.iterator.next().value;
  };

  *generator(): IterableIterator<Tile> {
    if (this.tiles) {
      while (true) {
        yield this.tiles[this.index];
        this.index = (this.index + 1) % this.tiles.length;
      }
    }
  }
}
