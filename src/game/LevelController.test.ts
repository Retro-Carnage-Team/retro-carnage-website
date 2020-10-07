import LevelController from "./LevelController";
import Rectangle from "./Rectangle";
import { Directions } from "./Directions";
import Enemy, { EnemyType } from "./Enemy";
import { EnemySkins } from "./EnemySkins";

const SEGMENTS = [
  {
    backgrounds: [
      "bg-dummy-1.jpg",
      "bg-dummy-2.jpg",
      "bg-dummy-3.jpg",
      "bg-dummy-1.jpg",
      "bg-dummy-2.jpg",
    ],
    direction: Directions.Up,
    enemies: [
      new Enemy(
        550,
        [
          {
            duration: 4375,
            offsetXPerMs: 0,
            offsetYPerMs: 0.4,
            timeElapsed: 0,
          },
        ],
        new Rectangle(300, -200, 90, 200),
        EnemySkins.GREY_ONESIE_WITH_RIFLE,
        Directions.Down,
        EnemyType.Person
      ),
    ],
    goal: null,
    obstacles: [new Rectangle(400, -300, 200, 200)],
  },
  {
    backgrounds: [
      "bg-dummy-2.jpg",
      "bg-dummy-3.jpg",
      "bg-dummy-1.jpg",
      "bg-dummy-2.jpg",
    ],
    direction: Directions.Left,
    enemies: [],
    goal: null,
    obstacles: [],
  },
  {
    backgrounds: ["bg-dummy-2.jpg", "bg-dummy-3.jpg", "bg-dummy-1.jpg"],
    direction: Directions.Right,
    enemies: [],
    goal: new Rectangle(42, 42, 200, 200),
    obstacles: [],
  },
];

test("Should calculate the offsets for background depending for direction UP", () => {
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

test("Should calculate the offsets for background depending for direction LEFT", () => {
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

test("Should calculate the offsets for background depending for direction RIGHT", () => {
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

test("Should calculate how far a player is behind the scroll barrier for direction UP", () => {
  const controller = new LevelController(SEGMENTS);

  const posPlayerOne = new Rectangle(500, 1200, 90, 20);
  const posPlayerTwo = new Rectangle(1000, 900, 90, 20);
  let result = controller.getDistanceBehindScrollBarrier([
    posPlayerOne,
    posPlayerTwo,
  ]);
  expect(result).toBe(100);

  result = controller.getDistanceBehindScrollBarrier([
    posPlayerTwo,
    posPlayerOne,
  ]);
  expect(result).toBe(100);

  result = controller.getDistanceBehindScrollBarrier([posPlayerOne]);
  expect(result).toBe(-200);
});

test("Should calculate how far a player is behind the scroll barrier for direction LEFT", () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();

  const posPlayerOne = new Rectangle(500, 1200, 90, 20);
  const posPlayerTwo = new Rectangle(1000, 900, 90, 20);
  let result = controller.getDistanceBehindScrollBarrier([
    posPlayerOne,
    posPlayerTwo,
  ]);
  expect(result).toBe(500);

  result = controller.getDistanceBehindScrollBarrier([
    posPlayerTwo,
    posPlayerOne,
  ]);
  expect(result).toBe(500);

  result = controller.getDistanceBehindScrollBarrier([posPlayerTwo]);
  expect(Math.abs(result)).toBe(0);
});

test("Should calculate how far a player is behind the scroll barrier for direction RIGHT", () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();
  controller.progressToNextSegment();

  const posPlayerOne = new Rectangle(500, 1200, 90, 20);
  const posPlayerTwo = new Rectangle(1000, 900, 90, 20);
  let result = controller.getDistanceBehindScrollBarrier([
    posPlayerOne,
    posPlayerTwo,
  ]);
  expect(result).toBe(590);

  result = controller.getDistanceBehindScrollBarrier([
    posPlayerTwo,
    posPlayerOne,
  ]);
  expect(result).toBe(590);

  result = controller.getDistanceBehindScrollBarrier([posPlayerOne]);
  expect(result).toBe(90);
});

test("Should scroll up when direction is up and player is at the top", () => {
  const controller = new LevelController(SEGMENTS);
  const posPlayerOne = new Rectangle(500, 200, 90, 200);

  let offset = controller.updatePosition(50, [posPlayerOne]);
  expect(offset).toEqual({ x: 0, y: -15 });
  expect(controller.backgrounds[0].offsetX).toBe(0);
  expect(controller.backgrounds[0].offsetY).toBe(15);
  expect(controller.backgrounds[1].offsetX).toBe(0);
  expect(controller.backgrounds[1].offsetY).toBe(-1485);

  offset = controller.updatePosition(90, [posPlayerOne]);
  expect(offset).toEqual({ x: 0, y: -27 });
  expect(controller.backgrounds[0].offsetX).toBe(0);
  expect(controller.backgrounds[0].offsetY).toBe(42);
  expect(controller.backgrounds[1].offsetX).toBe(0);
  expect(controller.backgrounds[1].offsetY).toBe(-1458);
});

test("Should scroll left when direction is left and player is at the left", () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();
  const posPlayerOne = new Rectangle(200, 500, 90, 200);

  let offset = controller.updatePosition(50, [posPlayerOne]);
  expect(offset).toEqual({ x: -15, y: 0 });
  expect(controller.backgrounds[0].offsetX).toBe(15);
  expect(controller.backgrounds[0].offsetY).toBe(0);
  expect(controller.backgrounds[1].offsetX).toBe(-1485);
  expect(controller.backgrounds[1].offsetY).toBe(0);

  offset = controller.updatePosition(90, [posPlayerOne]);
  expect(offset).toEqual({ x: -27, y: 0 });
  expect(controller.backgrounds[0].offsetX).toBe(42);
  expect(controller.backgrounds[0].offsetY).toBe(0);
  expect(controller.backgrounds[1].offsetX).toBe(-1458);
  expect(controller.backgrounds[1].offsetY).toBe(0);
});

test("Should scroll right when direction is right and player is at the right", () => {
  const controller = new LevelController(SEGMENTS);
  controller.progressToNextSegment();
  controller.progressToNextSegment();
  const posPlayerOne = new Rectangle(1300, 500, 90, 200);

  let offset = controller.updatePosition(50, [posPlayerOne]);
  expect(offset).toEqual({ x: 15, y: 0 });
  expect(controller.backgrounds[0].offsetX).toBe(-15);
  expect(controller.backgrounds[0].offsetY).toBe(0);
  expect(controller.backgrounds[1].offsetX).toBe(1485);
  expect(controller.backgrounds[1].offsetY).toBe(0);

  offset = controller.updatePosition(90, [posPlayerOne]);
  expect(offset).toEqual({ x: 27, y: 0 });
  expect(controller.backgrounds[0].offsetX).toBe(-42);
  expect(controller.backgrounds[0].offsetY).toBe(0);
  expect(controller.backgrounds[1].offsetX).toBe(1458);
  expect(controller.backgrounds[1].offsetY).toBe(0);
});

test("Should activate enemies when game scrolled far enough", () => {
  const controller = new LevelController(SEGMENTS);
  const posPlayerOne = new Rectangle(500, 200, 90, 200);

  let offset = controller.updatePosition(2000, [posPlayerOne]);
  let enemies = controller.getActivatedEnemies();
  expect(offset).toEqual({ x: 0, y: -600 });
  expect(enemies.length).toBe(1);

  offset = controller.updatePosition(50, [posPlayerOne]);
  expect(offset).toEqual({ x: 0, y: -15 });
  enemies = controller.getActivatedEnemies();
  expect(enemies.length).toBe(0);
});

test("Should return obstacles when they scroll into the visible area", () => {
  const controller = new LevelController(SEGMENTS);
  let obstacles = controller.getObstaclesOnScreen();
  expect(obstacles.length).toBe(0);

  const posPlayerOne = new Rectangle(500, 200, 90, 200);
  let offset = controller.updatePosition(2000, [posPlayerOne]);
  expect(offset).toEqual({ x: 0, y: -600 });

  obstacles = controller.getObstaclesOnScreen();
  expect(obstacles.length).toBe(1);
  expect(obstacles[0].x).toBe(400);
  expect(obstacles[0].y).toBe(300);
  expect(obstacles[0].width).toBe(200);
  expect(obstacles[0].height).toBe(200);
});
