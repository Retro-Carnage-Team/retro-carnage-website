import Rectangle from "./Rectangle";

test("Should return no intersection when rectangles don't overlap", () => {
  const r1 = new Rectangle(1, 1, 1, 1);
  const r2 = new Rectangle(5, 5, 1, 1);
  expect(r1.getIntersection(r2)).toBeNull();
});

test("Should return intersection when rectangles overlap", () => {
  const r1 = new Rectangle(1, 1, 10, 10);
  const r2 = new Rectangle(6, 6, 10, 10);
  const result = r1.getIntersection(r2);
  expect(result?.x).toBe(6);
  expect(result?.y).toBe(6);
  expect(result?.width).toBe(5);
  expect(result?.height).toBe(5);
});

test("Should return intersection when rectangle contains other rectangle", () => {
  const r1 = new Rectangle(1, 1, 10, 10);
  const r2 = new Rectangle(3, 3, 3, 3);
  const result = r1.getIntersection(r2);
  expect(result?.x).toBe(3);
  expect(result?.y).toBe(3);
  expect(result?.width).toBe(3);
  expect(result?.height).toBe(3);
});

test("Should add offsets correctly", () => {
  const r1 = new Rectangle(1, 1, 10, 10);
  r1.add({ x: 2, y: 3 });
  expect(r1.x).toBe(3);
  expect(r1.y).toBe(4);
  expect(r1.width).toBe(10);
  expect(r1.height).toBe(10);
});

test("Should subtract offsets correctly", () => {
  const r1 = new Rectangle(1, 1, 10, 10);
  r1.subtract({ x: 2, y: 3 });
  expect(r1.x).toBe(-1);
  expect(r1.y).toBe(-2);
  expect(r1.width).toBe(10);
  expect(r1.height).toBe(10);
});
