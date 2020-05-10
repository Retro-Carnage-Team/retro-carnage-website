import {
  DIRECTION_UP,
  DIRECTION_UP_RIGHT,
  DIRECTION_RIGHT,
  DIRECTION_DOWN_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_DOWN_LEFT,
  DIRECTION_LEFT,
  DIRECTION_UP_LEFT
} from './Directions';

export default class PlayerBehavior {

  constructor(player) {
    this.player = player;
    this.direction = DIRECTION_UP;
    this.moving = false;
    this.firing = false;
    this.nextWeapon = false;
    this.previousWeapon = false;
  }

  update = (userInput) => {
    if(!userInput || !this.player.isAlive()) {
      return;
    }

    const playerWantsToMove = (userInput.moveUp || userInput.moveDown || userInput.moveLeft || userInput.moveRight);
    this.moving = playerWantsToMove && !(!this.moving && this.firing);
    this.firing = userInput.fire;
    if(playerWantsToMove) {
      this.direction = this.getDirection(userInput.moveUp, userInput.moveDown, userInput.moveLeft, userInput.moveRight);
    }

    if(!this.nextWeapon && userInput.toggleUp) {
      this.player.selectNextWeapon();
    }
    this.nextWeapon = userInput.toggleUp;

    if(!this.previousWeapon && userInput.toggleDown) {
      this.player.selectPreviousWeapon();
    }
    this.previousWeapon = userInput.toggleDown;
  }

  getDirection = (up, down, left, right) => {
    if(up && !down && !left && !right) {
      return DIRECTION_UP;
    }
    if(up && !down && left && !right) {
      return DIRECTION_UP_LEFT;
    }
    if(up && !down && !left && right) {
      return DIRECTION_UP_RIGHT;
    }
    if(!up && down && !left && !right) {
      return DIRECTION_DOWN;
    }
    if(!up && down && left && !right) {
      return DIRECTION_DOWN_LEFT;
    }
    if(!up && down && !left && right) {
      return DIRECTION_DOWN_RIGHT;
    }
    if(!up && !down && left && !right) {
      return DIRECTION_LEFT;
    }
    if(!up && !down && !left && right) {
      return DIRECTION_RIGHT;
    }
    return this.direction;
  }

}