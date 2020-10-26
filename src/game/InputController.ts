import ChangeListener from "./ChangeListener";
import { Directions } from "./Directions";
import GamepadController from "./GamepadController";
import KeyboardController from "./KeyboardController";
import InputState from "./InputState";

export const CONTROLLER_STATUS_GAMEPAD = "G";
export const CONTROLLER_STATUS_KEYBOARD = "K";
export const PROP_DIRECTION = "direction";
export const PROP_BUTTON = "button";

class RapidFireState {
  private pressedSince: number | null = null;
  private reachedThreshold = false;

  update(inputState: InputState): boolean {
    if (RapidFireState.isButtonPressed(inputState)) {
      if (null == this.pressedSince) {
        this.pressedSince = Date.now();
        return true;
      } else {
        if (
          !this.reachedThreshold &&
          this.pressedSince + RapidFireState.RAPID_FIRE_THRESHOLD < Date.now()
        ) {
          this.reachedThreshold = true;
          this.pressedSince = Date.now();
          return true;
        } else if (
          this.reachedThreshold &&
          this.pressedSince + RapidFireState.RAPID_FIRE_OFFSET < Date.now()
        ) {
          this.pressedSince = Date.now();
          return true;
        } else return false;
      }
    } else {
      this.pressedSince = null;
      return false;
    }
  }

  static isButtonPressed(inputState: InputState): boolean {
    return (
      inputState.fire ||
      inputState.grenade ||
      inputState.toggleUp ||
      inputState.toggleDown
    );
  }

  private static RAPID_FIRE_THRESHOLD = 750;
  private static RAPID_FIRE_OFFSET = 300;
}

export class InputController {
  gamepadController: GamepadController;
  keyboardController: KeyboardController;
  inputProviders: (() => InputState | null)[];
  intervalId: number | null;
  changeListeners: ChangeListener<any>[];
  gamepadState: (InputState | null)[];
  rapidFireState: (RapidFireState | null)[];

  constructor() {
    this.gamepadController = new GamepadController();
    this.keyboardController = new KeyboardController();
    this.inputProviders = [];
    this.intervalId = null;
    this.changeListeners = [];
    this.gamepadState = [null, null, null, null];
    this.rapidFireState = [null, null, null, null];
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
          const horizontal = newState.moveLeft || newState.moveRight;
          const vertical = newState.moveUp || newState.moveDown;
          if (!oldState.moveUp && newState.moveUp && !horizontal) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Up, PROP_DIRECTION)
            );
          }
          if (!oldState.moveDown && newState.moveDown && !horizontal) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Down, PROP_DIRECTION)
            );
          }
          if (!oldState.moveLeft && newState.moveLeft && !vertical) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Left, PROP_DIRECTION)
            );
          }
          if (!oldState.moveRight && newState.moveRight && !vertical) {
            _this.changeListeners.forEach((listener) =>
              listener.call(Directions.Right, PROP_DIRECTION)
            );
          }

          if (_this.rapidFireState[idx]?.update(newState)) {
            _this.changeListeners.forEach((listener) =>
              listener.call(true, PROP_BUTTON)
            );
          }
        }
        return newState;
      });
    }
    this.rapidFireState = [
      new RapidFireState(),
      new RapidFireState(),
      new RapidFireState(),
      new RapidFireState(),
    ];
    this.intervalId = window.setInterval(updateControllerStatus.bind(this), 25);
  };

  stopGuiMode = () => {
    if (null !== this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      this.rapidFireState = [null, null, null, null];
    }
  };

  getControllerStatus = (): string[] => {
    let result = [];
    for (let i = 0; i < this.gamepadController.getControllerCount(); i++) {
      result.push(CONTROLLER_STATUS_GAMEPAD);
    }
    result.push(CONTROLLER_STATUS_KEYBOARD);
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
