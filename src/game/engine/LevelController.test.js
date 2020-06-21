import LevelController from './LevelController';
import Rectangle from './Rectangle';

const SEGMENTS = [
  {
    backgrounds: ['bg-dummy-1.jpg', 'bg-dummy-2.jpg', 'bg-dummy-3.jpg', 'bg-dummy-1.jpg', 'bg-dummy-2.jpg'],
    direction: 'up',
    enemies: [],
    goal: null,
    obstacles: []
  }, {
    backgrounds: ['bg-dummy-2.jpg', 'bg-dummy-3.jpg', 'bg-dummy-1.jpg', 'bg-dummy-2.jpg'],
    direction: 'left',
    enemies: [],
    goal: null,
    obstacles: []
  }, {
    backgrounds: ['bg-dummy-2.jpg', 'bg-dummy-3.jpg', 'bg-dummy-1.jpg'],
    direction: 'right',
    enemies: [],
    goal: { x: 42, y: 42, w: 200, h: 200 },
    obstacles: []
  },
];

test('Should calculate the offsets for background depending for direction UP', () => {
  const controller = new LevelController(SEGMENTS);
  const backgrounds = controller.backgrounds;
  expect(backgrounds.length).toBe(5);
  expect(Math.abs(backgrounds[0].offsetX)).toBe(0);
  expect(Math.abs(backgrounds[0].offsetY)).toBe(0);
  expect(Math.abs(backgrounds[1].offsetX)).toBe(0);
  expect(backgrounds[1].offsetY).toBe(-1500);
  expect(Math.abs(backgrounds[2].offsetX)).toBe(0);
  expect(backgrounds[2].offsetY).toBe(-3000);
});

test('Should calculate the offsets for background depending for direction LEFT', () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();
  const backgrounds = controller.backgrounds;
  expect(backgrounds.length).toBe(4);
  expect(Math.abs(backgrounds[0].offsetX)).toBe(0);
  expect(Math.abs(backgrounds[0].offsetY)).toBe(0);
  expect(backgrounds[1].offsetX).toBe(-1500);
  expect(Math.abs(backgrounds[1].offsetY)).toBe(0);
  expect(backgrounds[2].offsetX).toBe(-3000);
  expect(Math.abs(backgrounds[2].offsetY)).toBe(0);
});

test('Should calculate the offsets for background depending for direction RIGHT', () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();
  controller.progressToNextSegment();
  const backgrounds = controller.backgrounds;
  expect(backgrounds.length).toBe(3);
  expect(Math.abs(backgrounds[0].offsetX)).toBe(0);
  expect(Math.abs(backgrounds[0].offsetY)).toBe(0);
  expect(backgrounds[1].offsetX).toBe(1500);
  expect(Math.abs(backgrounds[1].offsetY)).toBe(0);
  expect(backgrounds[2].offsetX).toBe(3000);
  expect(Math.abs(backgrounds[2].offsetY)).toBe(0);
});

test('Should calculate how far a player is behind the scroll barrier for direction UP', () => {
  const controller = new LevelController(SEGMENTS);

  const posPlayerOne = new Rectangle(500, 1200, 90, 20);
  const posPlayerTwo = new Rectangle(1000, 900, 90, 20);
  let result = controller.getDistanceBehindScrollBarrier([posPlayerOne, posPlayerTwo]);
  expect(result).toBe(100);

  result = controller.getDistanceBehindScrollBarrier([posPlayerTwo, posPlayerOne]);
  expect(result).toBe(100);

  result = controller.getDistanceBehindScrollBarrier([posPlayerOne]);
  expect(result).toBe(-200);
});

test('Should calculate how far a player is behind the scroll barrier for direction LEFT', () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();

  const posPlayerOne = new Rectangle(500, 1200, 90, 20);
  const posPlayerTwo = new Rectangle(1000, 900, 90, 20);
  let result = controller.getDistanceBehindScrollBarrier([posPlayerOne, posPlayerTwo]);
  expect(result).toBe(500);

  result = controller.getDistanceBehindScrollBarrier([posPlayerTwo, posPlayerOne]);
  expect(result).toBe(500);

  result = controller.getDistanceBehindScrollBarrier([posPlayerTwo]);
  expect(Math.abs(result)).toBe(0);
});

test('Should calculate how far a player is behind the scroll barrier for direction RIGHT', () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();
  controller.progressToNextSegment();

  const posPlayerOne = new Rectangle(500, 1200, 90, 20);
  const posPlayerTwo = new Rectangle(1000, 900, 90, 20);
  let result = controller.getDistanceBehindScrollBarrier([posPlayerOne, posPlayerTwo]);
  expect(result).toBe(590);

  result = controller.getDistanceBehindScrollBarrier([posPlayerTwo, posPlayerOne]);
  expect(result).toBe(590);

  result = controller.getDistanceBehindScrollBarrier([posPlayerOne]);
  expect(result).toBe(90);
});
