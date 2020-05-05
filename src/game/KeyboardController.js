import InputState from './InputState';

export default class KeyboardController {

  constructor() {
    this.inputState = new InputState();
    this.setUp();
  }

  getInputState = () => {
    return this.inputState;
  }

  processKeyDown = (event) => {
    this.processKeyEvent(event, true);
  }

  processKeyUp = (event) => {
    this.processKeyEvent(event, false);
  }

  processKeyEvent = (event, status) => {
    this.inputState.fire = event.ctrlKey;
    switch (event.key) {
      case 'ArrowLeft':
        this.inputState.moveLeft = status;
        break;
      case 'ArrowUp':
        this.inputState.moveUp = status;
        break;
      case 'ArrowRight':
        this.inputState.moveRight = status;
        break;
      case 'ArrowDown':
        this.inputState.moveDown = status;
        break;
      case 'Shift':
        this.inputState.toggleDown = status;
        break;
      default:
    }
  }

  setUp = () => {
    window.document.addEventListener('keydown', this.processKeyDown);
    window.document.addEventListener('keyup', this.processKeyUp);
  }

  tearDown = () => {
    window.document.removeEventListener('keydown', this.processKeyDown);
    window.document.removeEventListener('keyup', this.processKeyUp);
  }

}
