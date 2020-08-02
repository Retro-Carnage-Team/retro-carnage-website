import { Directions } from "./Directions";
import { Player, PlayerProperties } from "./Player";
import PlayerBehavior from "./PlayerBehavior";
import ChangeListener from "./ChangeListener";
import InputState from "./InputState";

test("Player in default state should be able to move up", () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  const inputState = new InputState();
  inputState.moveUp = true;
  playerBehavior.update(inputState);
  expect(playerBehavior.moving).toBeTruthy();
  expect(playerBehavior.direction).toBe(Directions.Up);
});

test("Player in default state should be able to move diagonally", () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  const inputState = new InputState();

  inputState.moveDown = true;
  inputState.moveRight = true;

  playerBehavior.update(inputState);
  expect(playerBehavior.moving).toBeTruthy();
  expect(playerBehavior.direction).toBe(Directions.DownRight);
});

test("Moving player should be able to change direction while moving", () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);

  let inputState = new InputState();
  inputState.moveUp = true;
  playerBehavior.update(inputState);

  inputState = new InputState();
  inputState.moveLeft = true;
  playerBehavior.update(inputState);

  expect(playerBehavior.moving).toBeTruthy();
  expect(playerBehavior.direction).toBe(Directions.Left);
});

test("Player should keep direction when stopping movement and keep firing", () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);

  let inputState = new InputState();
  inputState.moveUp = true;
  inputState.fire = true;
  playerBehavior.update(inputState);

  inputState = new InputState();
  inputState.moveUp = false;
  inputState.fire = true;
  playerBehavior.update(inputState);

  expect(playerBehavior.moving).toBeFalsy();
  expect(playerBehavior.direction).toBe(Directions.Up);
  expect(playerBehavior.firing).toBeTruthy();
});

test("Player should be able to change direction but not start moving when firing", () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);

  let inputState = new InputState();
  inputState.fire = true;
  playerBehavior.update(inputState);

  inputState = new InputState();
  inputState.moveLeft = true;
  inputState.fire = true;
  playerBehavior.update(inputState);

  expect(playerBehavior.moving).toBeFalsy();
  expect(playerBehavior.direction).toBe(Directions.Left);
  expect(playerBehavior.firing).toBeTruthy();
});

test("Switching to next weapon gets fired only once per button press", () => {
  let callCounter = 0;
  function callback() {
    callCounter += 1;
  }
  const player = new Player(0);
  const listener = new ChangeListener(
    callback,
    PlayerProperties.SelectedWeapon
  );
  player.addChangeListener(listener);
  const playerBehavior = new PlayerBehavior(player);

  const inputState = new InputState();
  inputState.toggleUp = true;
  playerBehavior.update(inputState);
  playerBehavior.update(inputState);

  expect(callCounter).toBe(1);

  player.removeChangeListener(listener);
});

test("Switching to previous weapon gets fired only once per button press", () => {
  let callCounter = 0;
  function callback() {
    callCounter += 1;
  }
  const player = new Player(0);
  const listener = new ChangeListener(
    callback,
    PlayerProperties.SelectedWeapon
  );
  player.addChangeListener(listener);
  const playerBehavior = new PlayerBehavior(player);

  const inputState = new InputState();
  inputState.toggleDown = true;
  playerBehavior.update(inputState);
  playerBehavior.update(inputState);

  expect(callCounter).toBe(1);

  player.removeChangeListener(listener);
});

test("triggeredFire gets set when firing and unset when held down", () => {
  const player = new Player(0);
  const playerBehavior = new PlayerBehavior(player);
  const inputState = new InputState();
  inputState.fire = true;
  playerBehavior.update(inputState);
  expect(playerBehavior.triggeredFire).toBeTruthy();
  playerBehavior.update(inputState);
  expect(playerBehavior.triggeredFire).toBeFalsy();
});
