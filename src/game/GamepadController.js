import InputState from './InputState';

// Old controllers might be a bit wobbly and need a higher value.
const INPUT_THRESHOLD = 0.15;

// The Gamepad API (https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) is not event driven and relies on 
// polling instead. For now I assume that it will be sufficient query the state of the controllers with every frame of
// the game - which would be every ~33 ms. If that is not sufficient it might be necesary to implement a second, faster
// polling intervall.
export default class GamepadController {

  constructor() {
    this.navigator = window.navigator;
  }

  getControllerCount = () => {
    return (null == this.navigator) ? 0 : this.navigator.getGamepads().length;
  }

  getControllerInfo = (index) => {
    if((!this.navigator) || (this.navigator.getGamepads().length <= index)) {
      return "ERROR";
    }
    return this.navigator.getGamepads()[index].id;
  }

  getInputStateProviders = () => {
    return this.navigator.getGamepads().map((gp) => (() => this.getInputState(gp.index)));
  }

  getInputState = (index) => {
    if(null == this.navigator) {
      return null;
    }

    const gamepads = this.navigator.getGamepads();
    if(index >= gamepads.length) {
      return null;
    }

    // TODO: Add mappings for other controllers
    return this.decodeXBox360Values(gamepads[index]);
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
