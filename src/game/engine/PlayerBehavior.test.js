import {
  DIRECTION_UP,
  DIRECTION_DOWN_RIGHT,
  DIRECTION_LEFT,
} from './Directions';
import { Player, PROP_SELECTED_WEAPON } from '../Player';
import PlayerBehavior from './PlayerBehavior';
import ChangeListener from '../ChangeListener';
import InputState from '../InputState';

test('Player in default state should be able to move up', () => {
  const player = new Player();
  const playerBehavior = new PlayerBehavior(player);
  const inputState = new InputState();
  inputState.moveUp = true;
  playerBehavior.update(inputState);
  expect(playerBehavior.moving).toBeTruthy();
  expect(playerBehavior.direction).toBe(DIRECTION_UP);
});

test('Player in default state should be able to move diagonally', () => {
  const player = new Player();
  const playerBehavior = new PlayerBehavior(player);
  const inputState = new InputState();

  inputState.moveDown = true;
  inputState.moveRight = true;

  playerBehavior.update(inputState);
  expect(playerBehavior.moving).toBeTruthy();
  expect(playerBehavior.direction).toBe(DIRECTION_DOWN_RIGHT);
});

test('Moving player should be able to change direction while moving', () => {
  const player = new Player();
  const playerBehavior = new PlayerBehavior(player);

  let inputState = new InputState();
  inputState.moveUp = true;
  playerBehavior.update(inputState);

  inputState = new InputState();
  inputState.moveLeft = true;
  playerBehavior.update(inputState);

  expect(playerBehavior.moving).toBeTruthy();
  expect(playerBehavior.direction).toBe(DIRECTION_LEFT);
});

test('Player should keep direction when stopping movement and keep firing', () => {
  const player = new Player();
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
  expect(playerBehavior.direction).toBe(DIRECTION_UP);
  expect(playerBehavior.firing).toBeTruthy();
});

test('Player should be able to change direction but not start moving when firing', () => {
  const player = new Player();
  const playerBehavior = new PlayerBehavior(player);

  let inputState = new InputState();
  inputState.fire = true;
  playerBehavior.update(inputState);

  inputState = new InputState();
  inputState.moveLeft = true;
  inputState.fire = true;
  playerBehavior.update(inputState);

  expect(playerBehavior.moving).toBeFalsy();
  expect(playerBehavior.direction).toBe(DIRECTION_LEFT);
  expect(playerBehavior.firing).toBeTruthy();
});

test('Switching to next weapon gets fired only once per button press', () => {
  let callCounter = 0;
  function callback() {
    callCounter += 1;
  }
  const player = new Player();
  const listener = new ChangeListener(callback, PROP_SELECTED_WEAPON);
  player.addChangeListener(listener);
  const playerBehavior = new PlayerBehavior(player);

  const inputState = new InputState();
  inputState.toggleUp = true;
  playerBehavior.update(inputState);
  playerBehavior.update(inputState);

  expect(callCounter).toBe(1);

  player.removeChangeListener(listener);
});

test('Switching to previous weapon gets fired only once per button press', () => {
  let callCounter = 0;
  function callback() {
    callCounter += 1;
  }
  const player = new Player();
  const listener = new ChangeListener(callback, PROP_SELECTED_WEAPON);
  player.addChangeListener(listener);
  const playerBehavior = new PlayerBehavior(player);

  const inputState = new InputState();
  inputState.toggleDown = true;
  playerBehavior.update(inputState);
  playerBehavior.update(inputState);

  expect(callCounter).toBe(1);

  player.removeChangeListener(listener);
});