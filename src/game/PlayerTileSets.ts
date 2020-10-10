import { Directions } from "./Directions";
import { ImageTile } from "./Tile";

export interface PlayerTileSet {
  byDirection: Map<Directions, ImageTile[]>;
  death: ImageTile[];
  idle: Map<Directions, ImageTile>;
}

function buildAnimationSeries(
  count: number,
  w: number,
  h: number,
  folder: string,
  offsetX: number,
  offsetY: number
): ImageTile[] {
  let result: ImageTile[] = [];
  for (let i = 0; i < count; i++) {
    result.push(new ImageTile(`${folder}${i + 1}.png`, w, h, offsetX, offsetY));
  }
  return result;
}

function buildTileSetForPlayer0(): PlayerTileSet {
  const result: PlayerTileSet = {
    byDirection: new Map<Directions, ImageTile[]>(),
    death: buildAnimationSeries(
      21,
      135,
      220,
      "images/tiles/player-0/death/",
      -30,
      -50
    ),
    idle: new Map<Directions, ImageTile>(),
  };

  result.byDirection.set(
    Directions.Down,
    buildAnimationSeries(8, 96, 200, "images/tiles/player-0/down/", -2, -50)
  );
  result.byDirection.set(
    Directions.DownLeft,
    buildAnimationSeries(
      8,
      143,
      200,
      "images/tiles/player-0/down_left/",
      -48,
      -50
    )
  );
  result.byDirection.set(
    Directions.DownRight,
    buildAnimationSeries(
      7,
      139,
      200,
      "images/tiles/player-0/down_right/",
      1,
      -50
    )
  );
  result.byDirection.set(
    Directions.Left,
    buildAnimationSeries(8, 167, 200, "images/tiles/player-0/left/", -33, -50)
  );
  result.byDirection.set(
    Directions.Right,
    buildAnimationSeries(7, 187, 200, "images/tiles/player-0/right/", -70, -50)
  );
  result.byDirection.set(
    Directions.Up,
    buildAnimationSeries(8, 79, 200, "images/tiles/player-0/up/", 2, -50)
  );
  result.byDirection.set(
    Directions.UpLeft,
    buildAnimationSeries(8, 86, 200, "images/tiles/player-0/up_left/", 0, -50)
  );
  result.byDirection.set(
    Directions.UpRight,
    buildAnimationSeries(7, 152, 200, "images/tiles/player-0/up_right/", 0, -50)
  );

  result.idle.set(
    Directions.Down,
    new ImageTile("images/tiles/player-0/idle/down.png", 96, 200, -5, -50)
  );
  result.idle.set(
    Directions.DownLeft,
    new ImageTile(
      "images/tiles/player-0/idle/down_left.png",
      128,
      200,
      -37,
      -50
    )
  );
  result.idle.set(
    Directions.DownRight,
    new ImageTile("images/tiles/player-0/idle/down_right.png", 99, 200, 6, -50)
  );
  result.idle.set(
    Directions.Left,
    new ImageTile("images/tiles/player-0/idle/left.png", 105, 200, -22, -50)
  );
  result.idle.set(
    Directions.Right,
    new ImageTile("images/tiles/player-0/idle/right.png", 121, 200, 0, -50)
  );
  result.idle.set(
    Directions.Up,
    new ImageTile("images/tiles/player-0/idle/up.png", 85, 200, -2, -50)
  );
  result.idle.set(
    Directions.UpLeft,
    new ImageTile("images/tiles/player-0/idle/up_left.png", 75, 200, 2, -50)
  );
  result.idle.set(
    Directions.UpRight,
    new ImageTile("images/tiles/player-0/idle/up_right.png", 118, 200, 0, -50)
  );

  return result;
}

function buildTileSetForPlayer1(): PlayerTileSet {
  const result: PlayerTileSet = {
    byDirection: new Map<Directions, ImageTile[]>(),
    death: buildAnimationSeries(
      26,
      135,
      200,
      "images/tiles/player-1/death/",
      -30,
      -50
    ),
    idle: new Map<Directions, ImageTile>(),
  };

  result.byDirection.set(
    Directions.Down,
    buildAnimationSeries(6, 94, 200, "images/tiles/player-1/down/", -2, -50)
  );
  result.byDirection.set(
    Directions.DownLeft,
    buildAnimationSeries(
      6,
      154,
      200,
      "images/tiles/player-1/down_left/",
      -48,
      -50
    )
  );
  result.byDirection.set(
    Directions.DownRight,
    buildAnimationSeries(
      6,
      88,
      200,
      "images/tiles/player-1/down_right/",
      1,
      -50
    )
  );
  result.byDirection.set(
    Directions.Left,
    buildAnimationSeries(6, 160, 200, "images/tiles/player-1/left/", -33, -50)
  );
  result.byDirection.set(
    Directions.Right,
    buildAnimationSeries(6, 155, 200, "images/tiles/player-1/right/", 0, -50)
  );
  result.byDirection.set(
    Directions.Up,
    buildAnimationSeries(6, 85, 200, "images/tiles/player-1/up/", 2, -50)
  );
  result.byDirection.set(
    Directions.UpLeft,
    buildAnimationSeries(6, 100, 200, "images/tiles/player-1/up_left/", 0, -50)
  );
  result.byDirection.set(
    Directions.UpRight,
    buildAnimationSeries(6, 126, 200, "images/tiles/player-1/up_right/", 0, -50)
  );

  result.idle.set(
    Directions.Down,
    new ImageTile("images/tiles/player-1/idle/down.png", 100, 200, -5, -50)
  );
  result.idle.set(
    Directions.DownLeft,
    new ImageTile(
      "images/tiles/player-1/idle/down_left.png",
      127,
      200,
      -37,
      -50
    )
  );
  result.idle.set(
    Directions.DownRight,
    new ImageTile("images/tiles/player-1/idle/down_right.png", 92, 200, 6, -50)
  );
  result.idle.set(
    Directions.Left,
    new ImageTile("images/tiles/player-1/idle/left.png", 112, 200, -22, -50)
  );
  result.idle.set(
    Directions.Right,
    new ImageTile("images/tiles/player-1/idle/right.png", 133, 200, 0, -50)
  );
  result.idle.set(
    Directions.Up,
    new ImageTile("images/tiles/player-1/idle/up.png", 94, 200, -2, -50)
  );
  result.idle.set(
    Directions.UpLeft,
    new ImageTile("images/tiles/player-1/idle/up_left.png", 85, 200, 2, -50)
  );
  result.idle.set(
    Directions.UpRight,
    new ImageTile("images/tiles/player-1/idle/up_right.png", 125, 200, 0, -50)
  );

  return result;
}

export const TileSetForPlayer0 = buildTileSetForPlayer0();
export const TileSetForPlayer1 = buildTileSetForPlayer1();
