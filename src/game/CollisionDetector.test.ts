import Rectangle from "./Rectangle";
import CollisionDetector from "./CollisionDetector";
import { Directions } from "./Directions";

//--- Up -------------------------------------------------------------------------------------------------------------//

test("Should find collision for rect moving ↑ against center of larger rect", () => {
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

test("Should find collision for rect moving ↑ against another small rect (left)", () => {
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

test("Should find collision for rect moving ↑ against another small rect (right)", () => {
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

test("Should stop the ↑ movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(5, 10, 5, 2);
  const stillRect = new Rectangle(2, 5, 25, 2);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Up,
    {
      x: 0,
      y: -5,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(5);
  expect(result?.y).toBe(7);
  expect(result?.width).toBe(5);
  expect(result?.height).toBe(2);
});

test("Should stop the ↑ movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(5, 10, 5, 2);
  const stillRect = new Rectangle(7, 5, 1, 2);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Up,
    {
      x: 0,
      y: -6,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(5);
  expect(result?.y).toBe(7);
  expect(result?.width).toBe(5);
  expect(result?.height).toBe(2);
});

//--- Down -----------------------------------------------------------------------------------------------------------//

test("Should find collision for rect moving ↓ against center of larger rect", () => {
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

test("Should find collision for rect moving ↓ against another rect (left)", () => {
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

test("Should find collision for rect moving ↓ against another rect (right)", () => {
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

test("Should stop the ↓ movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(1, 1, 2, 2);
  const stillRect = new Rectangle(2, 4, 2, 2);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Down,
    {
      x: 0,
      y: 4,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(1);
  expect(result?.y).toBe(2);
  expect(result?.width).toBe(2);
  expect(result?.height).toBe(2);
});

test("Should stop the ↓ movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(1, 1, 4, 2);
  const stillRect = new Rectangle(2, 4, 2, 2);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Down,
    {
      x: 0,
      y: 5,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(1);
  expect(result?.y).toBe(2);
  expect(result?.width).toBe(4);
  expect(result?.height).toBe(2);
});

//--- Left -----------------------------------------------------------------------------------------------------------//

test("Should find collision for rect moving ← against center of larger rect", () => {
  const movingRect = new Rectangle(5, 3, 3, 3);
  const stillRect = new Rectangle(1, 1, 1, 9);

  const collision = CollisionDetector.getCollisionForMovementLeft(
    movingRect,
    stillRect,
    {
      x: -5,
      y: 0,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.x).toBe(2);
});

test("Should find collision for rect moving ← against another rect (top)", () => {
  const movingRect = new Rectangle(3, 3, 1, 3);
  const stillRect = new Rectangle(1, 1, 1, 3);

  const collision = CollisionDetector.getCollisionForMovementLeft(
    movingRect,
    stillRect,
    {
      x: -5,
      y: 0,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.x).toBe(2);
});

test("Should find collision for rect moving ← against another rect (bottom)", () => {
  const movingRect = new Rectangle(3, 3, 1, 3);
  const stillRect = new Rectangle(1, 5, 1, 3);

  const collision = CollisionDetector.getCollisionForMovementLeft(
    movingRect,
    stillRect,
    {
      x: -5,
      y: 0,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.x).toBe(2);
});

test("Should stop the ← movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(5, 3, 3, 3);
  const stillRect = new Rectangle(1, 1, 1, 9);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Left,
    {
      x: -5,
      y: 0,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(3);
  expect(result?.height).toBe(3);
});

test("Should stop the ← movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(5, 3, 3, 3);
  const stillRect = new Rectangle(1, 4, 1, 1);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Left,
    {
      x: -6,
      y: 0,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(3);
  expect(result?.height).toBe(3);
});

//--- Right ----------------------------------------------------------------------------------------------------------//

test("Should find collision for rect moving → against center of larger rect", () => {
  const movingRect = new Rectangle(1, 3, 2, 2);
  const stillRect = new Rectangle(4, 2, 1, 4);

  const collision = CollisionDetector.getCollisionForMovementRight(
    movingRect,
    stillRect,
    {
      x: 3,
      y: 0,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.x).toBe(4);
});

test("Should find collision for rect moving → against another rect (top)", () => {
  const movingRect = new Rectangle(1, 3, 2, 2);
  const stillRect = new Rectangle(4, 2, 1, 2);

  const collision = CollisionDetector.getCollisionForMovementRight(
    movingRect,
    stillRect,
    {
      x: 3,
      y: 0,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.x).toBe(4);
});

test("Should find collision for rect moving → against another rect (bottom)", () => {
  const movingRect = new Rectangle(1, 3, 2, 2);
  const stillRect = new Rectangle(4, 4, 1, 2);

  const collision = CollisionDetector.getCollisionForMovementRight(
    movingRect,
    stillRect,
    {
      x: 3,
      y: 0,
    }
  );

  expect(collision).toBeTruthy();
  expect(collision?.x).toBe(4);
});

test("Should stop the → movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(1, 3, 2, 2);
  const stillRect = new Rectangle(4, 4, 1, 2);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Right,
    {
      x: 3,
      y: 0,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(2);
  expect(result?.height).toBe(2);
});

test("Should stop the → movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(1, 3, 2, 9);
  const stillRect = new Rectangle(4, 4, 1, 2);

  const result = CollisionDetector.stopMovementOnCollision(
    movingRect,
    stillRect,
    Directions.Right,
    {
      x: 6,
      y: 0,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(2);
  expect(result?.height).toBe(9);
});

//--- Up Right -------------------------------------------------------------------------------------------------------//

test("Should stop the ↗ movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(1, 6, 1, 1);
  const stillRect = new Rectangle(3, 1, 4, 4);

  const result = CollisionDetector.stopUpRightMovement(movingRect, stillRect, {
    x: 3,
    y: -3,
  });

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(5);
  expect(result?.width).toBe(1);
  expect(result?.height).toBe(1);
});

test("Should stop the ↗ movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(1, 4, 6, 6);
  const stillRect = new Rectangle(4, 2, 1, 1);

  const result = CollisionDetector.stopUpRightMovement(movingRect, stillRect, {
    x: 2,
    y: -3,
  });

  expect(result).toBeTruthy();
  expect(result?.x).toBeCloseTo(1.666, 2);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(6);
  expect(result?.height).toBe(6);
});

//--- Down Right -----------------------------------------------------------------------------------------------------//

test("Should stop the ↘ movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(1, 1, 1, 1);
  const stillRect = new Rectangle(3, 3, 4, 4);

  const result = CollisionDetector.stopDownRightMovement(
    movingRect,
    stillRect,
    {
      x: 3,
      y: 3,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(2);
  expect(result?.width).toBe(1);
  expect(result?.height).toBe(1);
});

test("Should stop the ↘ movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(1, 1, 4, 4);
  const stillRect = new Rectangle(4, 6, 1, 1);

  const result = CollisionDetector.stopDownRightMovement(
    movingRect,
    stillRect,
    {
      x: 3,
      y: 3,
    }
  );

  expect(result).toBeTruthy();
  expect(result?.x).toBe(2);
  expect(result?.y).toBe(2);
  expect(result?.width).toBe(4);
  expect(result?.height).toBe(4);
});

//--- Up Left --------------------------------------------------------------------------------------------------------//

test("Should stop the ↖ movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(6, 4, 1, 1);
  const stillRect = new Rectangle(1, 1, 4, 4);

  const result = CollisionDetector.stopDownLeftMovement(movingRect, stillRect, {
    x: -2,
    y: -2,
  });

  expect(result).toBeTruthy();
  expect(result?.x).toBe(5);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(1);
  expect(result?.height).toBe(1);
});

test("Should stop the ↖ movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(1, 3, 4, 4);
  const stillRect = new Rectangle(1, 1, 1, 1);

  const result = CollisionDetector.stopUpLeftMovement(movingRect, stillRect, {
    x: -3,
    y: -3,
  });

  expect(result).toBeTruthy();
  expect(result?.x).toBe(0);
  expect(result?.y).toBe(2);
  expect(result?.width).toBe(4);
  expect(result?.height).toBe(4);
});

//--- Down Left ------------------------------------------------------------------------------------------------------//

test("Should stop the ↙ movement of a rect against center of larger rect", () => {
  const movingRect = new Rectangle(4, 3, 1, 1);
  const stillRect = new Rectangle(1, 5, 4, 4);

  const result = CollisionDetector.stopDownLeftMovement(movingRect, stillRect, {
    x: -3,
    y: 3,
  });

  expect(result).toBeTruthy();
  expect(result?.x).toBe(3);
  expect(result?.y).toBe(4);
  expect(result?.width).toBe(1);
  expect(result?.height).toBe(1);
});

test("Should stop the ↙ movement of a rect against center of smaller rect", () => {
  const movingRect = new Rectangle(4, 1, 4, 4);
  const stillRect = new Rectangle(4, 6, 1, 1);

  const result = CollisionDetector.stopDownLeftMovement(movingRect, stillRect, {
    x: -2,
    y: 2,
  });

  expect(result).toBeTruthy();
  expect(result?.x).toBe(3);
  expect(result?.y).toBe(2);
  expect(result?.width).toBe(4);
  expect(result?.height).toBe(4);
});
