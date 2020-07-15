import ExplosionTileSupplier, {
  DURATION_OF_FRAME,
} from "./ExplosionTileSupplier";

test("Returns tiles with correct timing", () => {
  const explosionTileSupplier = new ExplosionTileSupplier();

  let result = explosionTileSupplier.getTile(0);
  expect(result.path).toBe("images/tiles/explosion/0.png");
  result = explosionTileSupplier.getTile(DURATION_OF_FRAME - 5);
  expect(result.path).toBe("images/tiles/explosion/0.png");
  result = explosionTileSupplier.getTile(DURATION_OF_FRAME - 5);
  expect(result.path).toBe("images/tiles/explosion/1.png");
});

test("There should be no loop", () => {
  const explosionTileSupplier = new ExplosionTileSupplier();
  let result = explosionTileSupplier.getTile(1199);
  expect(result.path).toBe("images/tiles/explosion/47.png");
  result = explosionTileSupplier.getTile(50);
  expect(result.path).toBe("images/tiles/explosion/47.png");
});
