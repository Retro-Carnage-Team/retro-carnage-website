import ChangeListener from './ChangeListener';
import { DIRECTION_UP, DIRECTION_LEFT, DIRECTION_DOWN, DIRECTION_RIGHT } from './engine/Directions';
import GamepadController from './GamepadController';
import KeyboardController from './KeyboardController';

export const PROP_DIRECTION = 'direction';
export const PROP_BUTTON = 'button';

class InputController {

  constructor() {
    this.gamepadController = new GamepadController();
    this.keyboardController = new KeyboardController();
    this.inputProviders = [];
    this.intervalId = null;
    this.changeListeners = [];
    this.gamepadState = [null, null, null, null];
  }

  addChangeListener = (listener) => {
    if(!(listener instanceof ChangeListener)) {                                                                         // I made that mistake too often
      throw new Error('ChangeListeners have to be ChangeListener objects - not callbacks!');
    }
    this.changeListeners.push(listener);
  }

  removeChangeListener = (listener) => {
    const index = this.changeListeners.indexOf(listener);
    if (index > -1) {
      this.changeListeners.splice(index, 1);
    }
  }

  startGuiMode = () => {
    function updateControllerStatus() {
      this.gamepadState = [0, 1, 2, 3].map((idx) => {
        const oldState = this.gamepadState[idx];
        const newState = this.gamepadController.getInputState(idx);
        if(oldState && newState) {
          if(!oldState.moveUp && newState.moveUp) {
            this.changeListeners.forEach((listener) => listener.call(DIRECTION_UP, PROP_DIRECTION));
          }
          if(!oldState.moveDown && newState.moveDown) {
            this.changeListeners.forEach((listener) => listener.call(DIRECTION_DOWN, PROP_DIRECTION));
          }
          if(!oldState.moveLeft && newState.moveLeft) {
            this.changeListeners.forEach((listener) => listener.call(DIRECTION_LEFT, PROP_DIRECTION));
          }
          if(!oldState.moveRight && newState.moveRight) {
            this.changeListeners.forEach((listener) => listener.call(DIRECTION_RIGHT, PROP_DIRECTION));
          }
          if((!oldState.fire && newState.fire) ||
             (!oldState.grenade && newState.grenade) ||
             (!oldState.toggleUp && newState.toggleUp) ||
             (!oldState.toggleDown && newState.toggleDown)) {
            this.changeListeners.forEach((listener) => listener.call(true, PROP_BUTTON));
          }
        }
        return newState;
      });
    }
    this.intervalId = setInterval(updateControllerStatus.bind(this), 25);
  }

  stopGuiMode = () => {
    if(null !== this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getControllerStatus = () => {
    let result = [];
    for(let i=0; i<this.gamepadController.getControllerCount(); i++) {
      result.push('G');
    }
    result.push('K');
    return result;
  }

  getControllerInfo = (playerIdx) => {
    if(0 === playerIdx) {
      if(0 < this.gamepadController.getControllerCount()) {
        return this.gamepadController.getControllerInfo(0);
      } else {
        return 'Keyboard';
      }
    }
    if(1 < this.gamepadController.getControllerCount()) {
      return this.gamepadController.getControllerInfo(1);
    } else if(0 < this.gamepadController.getControllerCount()) {
      return 'Keyboard';
    }
    return 'no input device available';
  }

  isSecondPlayerPossible = () => {
    return 0 < this.gamepadController.getControllerCount();
  }

  assignControllersToPlayers = () => {
    this.inputProviders = []
      .concat(this.gamepadController.getInputStateProviders())
      .concat([this.keyboardController.getInputState]);
  }

}

const inputController = new InputController();
export default inputController;