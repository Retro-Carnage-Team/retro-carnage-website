import InputState from './InputState';

// Old controllers might be a bit wobbly and need a higher value.
const INPUT_THRESHOLD = 0.15;

class GamepadController {

  constructor() {
    this.navigator = null;
  }

  initialize = (navigator) => {
    this.navigator = navigator;
  }

  getControllerCount = () => {
    return (null == this.navigator) ? 0 : this.navigator.getGamepads().length;
  }

  getInputState = (index) => {
    if(null == this.navigator)
      return null;

    const gamepads = this.navigator.getGamepads();
    if(index >= gamepads.length)
      return null;

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

const gamepadController = new GamepadController();
export default gamepadController;