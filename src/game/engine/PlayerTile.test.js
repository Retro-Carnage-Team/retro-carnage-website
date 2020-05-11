import PlayerTile from './PlayerTile';
import Rectangle from './Rectangle';

test('Translation works like sum of vectors', () => {
  const tile = new PlayerTile(94, 200, 'images/tiles/player-1/down/', 3, 5);
  const result = tile.translate(new Rectangle(10, 11, 42, 42));
  expect(result.x).toBe(13);
  expect(result.y).toBe(16);
});