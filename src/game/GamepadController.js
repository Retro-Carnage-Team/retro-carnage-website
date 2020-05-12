import InputState from './InputState';

// Old controllers might be a bit wobbly and need a higher value.
const INPUT_THRESHOLD = 0.15;

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
    return (index >= gamepads.length) ? null : this.decodeXBox360Values(gamepads[index]);
  }

  decodeXBox360Values = (gamepad) => {
    let result = new InputState();
    result.moveUp = gamepad.axes[1] <= -1 * INPUT_THRESHOLD;
    result.moveDown = gamepad.axes[1] >= INPUT_THRESHOLD;
    result.moveLeft = gamepad.axes[0] <= -1 * INPUT_THRESHOLD;
    result.moveRight = gamepad.axes[0] >= INPUT_THRESHOLD;
    result.fire = gamepad.axes[5] > 0;
    result.toggleUp = gamepad.buttons[4].pressed;
    result.toggleDown = !result.toggleUp && gamepad.buttons[5].pressed;
    return result;
  }

}
