import GamepadController from './GamepadController';
import KeyboardController from './KeyboardController';

class InputController {

  constructor() {
    this.gamepadController = new GamepadController();
    this.keyboardController = new KeyboardController();
    this.inputProviders = [];
  }

  getControllerStatus = () => {
    let result = [];
    for(var i=0; i<this.gamepadController.getControllerCount(); i++) {
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
    this.inputProviders = this.gamepadController.getInputStateProviders().concat(this.keyboardController);
  }

}

const inputController = new InputController();
export default inputController;