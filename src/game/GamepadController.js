import InputState from './InputState';

// Old controllers might be a bit wobbly and need a higher value.
const INPUT_THRESHOLD = 0.15;

/**
 * Computes the angle (given in radians) for any point of the unit circle.
 * @param x position on x-axis
 * @param y position on x-axis
 * @returns {number}
 */
export function computeStickAngle(x,y) {
  if(0 <= x && 0 <= y) {                    // first quadrant
    return Math.asin(y)
  }
  if(0 > x && 0 <= y) {                     // second quadrant
    return Math.PI - Math.asin(y);
  }
  if(0 > x && 0 > y) {                      // second quadrant
    return Math.PI + Math.asin(-1 * y)
  }
  return 2 * Math.PI - Math.asin(-1 * y)
}

/**
 * Converts the given angle (in radians) into a combination of 4 cardinal directions
 * @param angle in radians
 * @returns {{left: boolean, up: boolean, right: boolean, down: boolean}}
 */
export function convertStickAngleToCardinalDirections(angle) {
  if((Math.PI / 8 <=  angle) && (3 * Math.PI / 8 > angle)) {
    return { up: true, down: false, left: false, right: true };
  }
  if((3 * Math.PI / 8 <=  angle) && (5 * Math.PI / 8 > angle)) {
    return { up: true, down: false, left: false, right: false };
  }
  if((5 * Math.PI / 8 <=  angle) && (7 * Math.PI / 8 > angle)) {
    return { up: true, down: false, left: true, right: false };
  }
  if((7 * Math.PI / 8 <=  angle) && (9 * Math.PI / 8 > angle)) {
    return { up: false, down: false, left: true, right: false };
  }
  if((9 * Math.PI / 8 <=  angle) && (11 * Math.PI / 8 > angle)) {
    return { up: false, down: true, left: true, right: false };
  }
  if((11 * Math.PI / 8 <=  angle) && (13 * Math.PI / 8 > angle)) {
    return { up: false, down: true, left: false, right: false };
  }
  if((13 * Math.PI / 8 <=  angle) && (15 * Math.PI / 8 > angle)) {
    return { up: false, down: true, left: false, right: true };
  }
  return { up: false, down: false, left: false, right: true };
}

function isStickMovedFully(x, y) {
  const radius = Math.sqrt(x*x + y*y);
  return 1 - INPUT_THRESHOLD < radius;
}

function decodeXBox360Values(gamepad) {
  let result = new InputState();
  if(isStickMovedFully(gamepad.axes[0], gamepad.axes[1])) {
    const angle = computeStickAngle(gamepad.axes[0], gamepad.axes[1] * -1);
    const {up, left, right, down} = convertStickAngleToCardinalDirections(angle);
    result.moveUp = up;
    result.moveDown = down;
    result.moveLeft = left;
    result.moveRight = right;
  }
  result.fire = gamepad.axes[5] > 0;
  result.toggleUp = gamepad.buttons[4].pressed;
  result.toggleDown = !result.toggleUp && gamepad.buttons[5].pressed;
  return result;
}

// The Gamepad API (https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) is not event driven and relies on 
// polling instead. For now I assume that it will be sufficient query the state of the controllers with every frame of
// the game - which would be every ~33 ms. If that is not sufficient it might be necessary to implement a second, faster
// polling interval.

// TODO: Add support for additional controllers
export default class GamepadController {

  constructor() {
    this.navigator = window.navigator;
  }

  getControllerCount = () => {
    let result = 0;
    if(this.navigator) {
      for (let idx = 0; idx < this.navigator.getGamepads().length; idx++) {
        if(this.navigator.getGamepads()[idx]) {
          result++;
        }
      }
    }
    return result;
  }

  getControllerInfo = (index) => {
    if((!this.navigator) || (this.navigator.getGamepads().length <= index)) {
      return 'ERROR';
    }
    return this.navigator.getGamepads()[index].id;
  }

  getInputStateProviders = () => {
    let result = [];
    if(this.navigator) {
      for (let idx = 0; idx < this.navigator.getGamepads().length; idx++) {
        if(this.navigator.getGamepads()[idx]) {
          result.push(() => this.getInputState(idx));
        }
      }
    }
    return result;
  }

  getInputState = (index) => {
    if(!this.navigator) {
      return null;
    }

    const gamepads = this.navigator.getGamepads();
    return (index >= gamepads.length) ? null : decodeXBox360Values(gamepads[index]);
  }

}
