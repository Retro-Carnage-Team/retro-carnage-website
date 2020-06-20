import InputState from './InputState';

// This module is written for and tested with the X-Box 360 controller.
// See https://en.wikipedia.org/wiki/Xbox_360_controller for details.

// Old controllers might be a bit wobbly and need a higher value.
const INPUT_THRESHOLD = 0.15;

const PI_OVER_8 = Math.PI / 8;
const PI_TIMES_3_OVER_8 = 3 * Math.PI / 8;
const PI_TIMES_5_OVER_8 = 5 * Math.PI / 8;
const PI_TIMES_7_OVER_8 = 7 * Math.PI / 8;
const PI_TIMES_9_OVER_8 = 9 * Math.PI / 8;
const PI_TIMES_11_OVER_8 = 11 * Math.PI / 8;
const PI_TIMES_13_OVER_8 = 13 * Math.PI / 8;
const PI_TIMES_15_OVER_8 = 15 * Math.PI / 8;

/**
 * Computes the angle (given in radians) for any point of the unit circle.
 *
 * @param x position on x-axis
 * @param y position on x-axis
 * @returns {number}
 */
export function computeStickAngle(x,y) {
  if(0 <= x && 0 <= y) {                    // first quadrant
    return Math.asin(y);
  }
  if(0 > x && 0 <= y) {                     // second quadrant
    return Math.PI - Math.asin(y);
  }
  if(0 > x && 0 > y) {                      // second quadrant
    return Math.PI + Math.asin(-1 * y);
  }
  return 2 * Math.PI - Math.asin(-1 * y);
}

/**
 * Converts the given angle (in radians) into a combination of 4 cardinal directions
 *
 * @param angle in radians
 * @returns {{left: boolean, up: boolean, right: boolean, down: boolean}}
 */
export function convertStickAngleToCardinalDirections(angle) {
  if((PI_OVER_8 <=  angle) && (PI_TIMES_3_OVER_8 > angle)) {
    return { up: true, down: false, left: false, right: true };
  }
  if((PI_TIMES_3_OVER_8 <=  angle) && (PI_TIMES_5_OVER_8 > angle)) {
    return { up: true, down: false, left: false, right: false };
  }
  if((PI_TIMES_5_OVER_8 <=  angle) && (PI_TIMES_7_OVER_8 > angle)) {
    return { up: true, down: false, left: true, right: false };
  }
  if((PI_TIMES_7_OVER_8 <=  angle) && (PI_TIMES_9_OVER_8 > angle)) {
    return { up: false, down: false, left: true, right: false };
  }
  if((PI_TIMES_9_OVER_8 <=  angle) && (PI_TIMES_11_OVER_8 > angle)) {
    return { up: false, down: true, left: true, right: false };
  }
  if((PI_TIMES_11_OVER_8 <=  angle) && (PI_TIMES_13_OVER_8 > angle)) {
    return { up: false, down: true, left: false, right: false };
  }
  if((PI_TIMES_13_OVER_8 <=  angle) && (PI_TIMES_15_OVER_8 > angle)) {
    return { up: false, down: true, left: false, right: true };
  }
  return { up: false, down: false, left: false, right: true };
}

function isStickMovedFully(x, y) {
  const radius = Math.sqrt(x*x + y*y);      // Use Pythagorean theorem
  return 1 - INPUT_THRESHOLD < radius;
}

/**
 * Gets the direction input from both the left thumb stick and the d-pad. Uses the input device that has to larger
 * absolute value (the device that gets actually used by the player).
 *
 * @param gamepad
 * @returns {{horizontal: float, vertical: float}}
 * @see https://en.wikipedia.org/wiki/D-Pad
 * @see https://en.wikipedia.org/wiki/Analog_stick
 */
function getDirectionFromThumbStickAndDPad(gamepad) {
  let horizontal = gamepad.axes[0];
  let vertical = gamepad.axes[1];
  if((Math.abs(horizontal) + Math.abs(vertical)) < (Math.abs(gamepad.axes[6]) + Math.abs(gamepad.axes[7]))) {
    horizontal = gamepad.axes[6];
    vertical = gamepad.axes[7];
  }
  return { horizontal, vertical };
}

function decodeXBox360Values(gamepad) {
  if(!gamepad) {
    return null;
  }

  let result = new InputState();
  const { horizontal, vertical } = getDirectionFromThumbStickAndDPad(gamepad);
  if(isStickMovedFully(horizontal, vertical)) {
    const angle = computeStickAngle(horizontal, vertical * -1);
    const {up, left, right, down} = convertStickAngleToCardinalDirections(angle);
    result.moveUp = up;
    result.moveDown = down;
    result.moveLeft = left;
    result.moveRight = right;
  }
  result.fire = gamepad.buttons[0].pressed;
  result.grenade = gamepad.buttons[1].pressed;
  result.toggleUp = gamepad.buttons[3].pressed;
  result.toggleDown = !result.toggleUp && gamepad.buttons[2].pressed;
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
