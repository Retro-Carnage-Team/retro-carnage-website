import PlayerTileSupplier, { DURATION_OF_MOVEMENT_ANIMATION } from './PlayerTileSupplier';
import {Player} from '../Player';
import PlayerBehavior from './PlayerBehavior';
import {
  DIRECTION_UP,
  DIRECTION_RIGHT
} from './Directions';

test('Returns correct tile for idle player', () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  playerBehavior.moving = false;
  playerBehavior.direction = DIRECTION_RIGHT;
  const playerTileSupplier = new PlayerTileSupplier(player);
  const result = playerTileSupplier.getTile(0, playerBehavior);
  expect(result.path).toBe('images/tiles/player-1/idle/right.png');
});

test('Starts movement animation tile #0 for player starting to move', () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  playerBehavior.moving = false;
  playerBehavior.direction = DIRECTION_RIGHT;
  const playerTileSupplier = new PlayerTileSupplier(player);
  playerTileSupplier.getTile(0, playerBehavior);

  playerBehavior.moving = true;
  playerBehavior.direction = DIRECTION_UP;
  let result = playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior);
  expect(result.path).toBe('images/tiles/player-1/up/1.png');

  playerBehavior.moving = true;
  playerBehavior.direction = DIRECTION_UP;
  result = playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior);
  expect(result.path).toBe('images/tiles/player-1/up/2.png');
});

test('Does not play the animation without delay', () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  playerBehavior.moving = true;
  playerBehavior.direction = DIRECTION_UP;
  const playerTileSupplier = new PlayerTileSupplier(player);
  const first = playerTileSupplier.getTile(0, playerBehavior);
  expect(first.path).toBe('images/tiles/player-1/up/1.png');
  const second = playerTileSupplier.getTile(50, playerBehavior);
  expect(second.path).toBe('images/tiles/player-1/up/1.png');
  const third = playerTileSupplier.getTile(50, playerBehavior);
  expect(third.path).toBe('images/tiles/player-1/up/2.png');
});

test('Plays animation in loop', () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  playerBehavior.moving = true;
  playerBehavior.direction = DIRECTION_UP;
  const playerTileSupplier = new PlayerTileSupplier(player);

  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/1.png');
  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/2.png');
  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/3.png');
  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/4.png');
  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/5.png');
  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/6.png');
  expect(playerTileSupplier.getTile(DURATION_OF_MOVEMENT_ANIMATION, playerBehavior).path)
    .toBe('images/tiles/player-1/up/1.png');
});
