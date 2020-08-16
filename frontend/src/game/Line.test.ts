import Line from "./Line";

test("Should calculate the intersection of horizontal and vertical lines", () => {
  const lineA = new Line({ x: 4, y: 0 }, { x: 4, y: 239 });
  const lineB = new Line({ x: 8, y: 20 }, { x: 2, y: 20 });
  const intersection = lineA.getIntersection(lineB);
  expect(intersection).toEqual({ x: 4, y: 20 });
});

test("Should calculate the intersection of horizontal and diagonal lines", () => {
  const lineA = new Line({ x: 2, y: 4 }, { x: 7, y: 4 });
  const lineB = new Line({ x: 2, y: 6 }, { x: 6, y: 2 });
  const intersection = lineA.getIntersection(lineB);
  expect(intersection).toEqual({ x: 4, y: 4 });
});

test("Line should equal itself", () => {
  const lineA = new Line({ x: 2, y: 4 }, { x: 7, y: 4 });
  expect(lineA.equals(lineA)).toBeTruthy();
});

test("Line should equal reversed self", () => {
  const lineA = new Line({ x: 2, y: 4 }, { x: 7, y: 4 });
  const lineB = new Line({ x: 7, y: 4 }, { x: 2, y: 4 });
  expect(lineA.equals(lineB)).toBeTruthy();
});

test("Line should not equal different line", () => {
  const lineA = new Line({ x: 3, y: 4 }, { x: 7, y: 4 });
  const lineB = new Line({ x: 7, y: 4 }, { x: 2, y: 4 });
  expect(lineA.equals(lineB)).toBeFalsy();
});
