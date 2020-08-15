import Rectangle from "./Rectangle";
import CollisionDetector from "./CollisionDetector";

//--- Up -------------------------------------------------------------------------------------------------------------//

test("Should find collision for small rectangle moving up against center of larger rectangle", () => {
  const movingRect = new Rectangle(5, 10, 5, 2);
  const stillRect = new Rectangle(2, 5, 25, 2);

  const collision = CollisionDetector.getCollisionForMovementUp(
    movingRect,
    stillRect,
    {
      x: 0,
      y: -5,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.y).toBe(7);
});

test("Should find collision for small rectangle moving up against another small rectangle (left)", () => {
  const movingRect = new Rectangle(2, 4, 2, 2);
  const stillRect = new Rectangle(1, 1, 2, 2);

  const collision = CollisionDetector.getCollisionForMovementUp(
    movingRect,
    stillRect,
    {
      x: 0,
      y: -4,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.y).toBe(3);
});

test("Should find collision for small rectangle moving up against another small rectangle (right)", () => {
  const movingRect = new Rectangle(2, 4, 2, 2);
  const stillRect = new Rectangle(3, 1, 2, 2);

  const collision = CollisionDetector.getCollisionForMovementUp(
    movingRect,
    stillRect,
    {
      x: 0,
      y: -4,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.y).toBe(3);
});

//--- Down -----------------------------------------------------------------------------------------------------------//

test("Should find collision for small rectangle moving down against center of larger rectangle", () => {
  const movingRect = new Rectangle(6, 3, 2, 1);
  const stillRect = new Rectangle(2, 8, 25, 2);

  const collision = CollisionDetector.getCollisionForMovementDown(
    movingRect,
    stillRect,
    {
      x: 0,
      y: 5,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.y).toBe(8);
});

test("Should find collision for small rectangle moving down against another small rectangle (left)", () => {
  const movingRect = new Rectangle(3, 1, 2, 2);
  const stillRect = new Rectangle(2, 4, 2, 2);

  const collision = CollisionDetector.getCollisionForMovementDown(
    movingRect,
    stillRect,
    {
      x: 0,
      y: 4,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.y).toBe(4);
});

test("Should find collision for small rectangle moving down against another small rectangle (right)", () => {
  const movingRect = new Rectangle(1, 1, 2, 2);
  const stillRect = new Rectangle(2, 4, 2, 2);

  const collision = CollisionDetector.getCollisionForMovementDown(
    movingRect,
    stillRect,
    {
      x: 0,
      y: 4,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.y).toBe(4);
});
