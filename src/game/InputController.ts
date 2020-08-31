import ChangeListener from "./ChangeListener";
import { Directions } from "./Directions";
import GamepadController from "./GamepadController";
import KeyboardController from "./KeyboardController";
import InputState from "./InputState";

export const PROP_DIRECTION = "direction";
export const PROP_BUTTON = "button";

export class InputController {
  gamepadController: GamepadController;
  keyboardController: KeyboardController;
  inputProviders: (() => InputState | null)[];
  intervalId: number | null;
  changeListeners: ChangeListener<any>[];
  gamepadState: (InputState | null)[];

  constructor() {
    this.gamepadController = new GamepadController();
    this.keyboardController = new KeyboardController();
    this.inputProviders = [];
    this.intervalId = null;
    this.changeListeners = [];
    this.gamepadState = [null, null, null, null];
  }

  addChangeListener = (listener: ChangeListener<any>) => {
    this.changeListeners.push(listener);
  };

  removeChangeListener = (listener: ChangeListener<any>) => {
    const index = this.changeListeners.indexOf(listener);
    if (index > -1) {
      this.changeListeners.splice(index, 1);
    }
  };

  startGuiMode = () => {
    const _this = this;
    function updateControllerStatus() {
      _this.gamepadState = [0, 1, 2, 3].map((idx) => {
        const oldState = _this.gamepadState[idx];
        const newState = _this.gamepadController.getInputState(idx);
        if (oldState && newState) {
          if (!oldState.moveUp && newState.moveUp) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Up, PROP_DIRECTION)
            );
          }
          if (!oldState.moveDown && newState.moveDown) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Down, PROP_DIRECTION)
            );
          }
          if (!oldState.moveLeft && newState.moveLeft) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Left, PROP_DIRECTION)
            );
          }
          if (!oldState.moveRight && newState.moveRight) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Right, PROP_DIRECTION)
            );
          }
          if (
            (!oldState.fire && newState.fire) ||
            (!oldState.grenade && newState.grenade) ||
            (!oldState.toggleUp && newState.toggleUp) ||
            (!oldState.toggleDown && newState.toggleDown)
          ) {
            _this.changeListeners.forEach((listener) =>
              listener.call(true, PROP_BUTTON)
            );
          }
        }
        return newState;
      });
    }
    this.intervalId = window.setInterval(updateControllerStatus.bind(this), 25);
  };

  stopGuiMode = () => {
    if (null !== this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  getControllerStatus = (): string[] => {
    let result = [];
    for (let i = 0; i < this.gamepadController.getControllerCount(); i++) {
      result.push("G");
    }
    result.push("K");
    return result;
  };

  getControllerInfo = (playerIdx: number): string => {
    if (0 === playerIdx) {
      if (0 < this.gamepadController.getControllerCount()) {
        return this.gamepadController.getControllerInfo(0);
      } else {
        return "Keyboard";
      }
    }
    if (1 < this.gamepadController.getControllerCount()) {
      return this.gamepadController.getControllerInfo(1);
    } else if (0 < this.gamepadController.getControllerCount()) {
      return "Keyboard";
    }
    return "no input device available";
  };

  isSecondPlayerPossible = (): boolean => {
    return 0 < this.gamepadController.getControllerCount();
  };

  assignControllersToPlayers = () => {
    this.gamepadController
      .getInputStateProviders()
      .forEach((ip) => this.inputProviders.push(ip));
    this.inputProviders.push(this.keyboardController.getInputState);
  };
}

export default new InputController();
