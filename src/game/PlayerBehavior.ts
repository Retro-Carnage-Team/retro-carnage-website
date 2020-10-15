import { Directions } from "./Directions";
import { Player } from "./Player";
import InputState from "./InputState";

/**
 * This class contains all player state that is valid for the duration of a single mission only.
 */
export default class PlayerBehavior {
  player: Player;
  direction: Directions;

  dying: boolean;
  dyingAnimationCountDown: number;
  invincible: boolean;
  invincibilityCountDown: number;
  timeSinceLastBullet: number;

  firing: boolean; // will be true as long as the player keeps the trigger pressed
  triggerPressed: boolean; // will be true only when switching from "not firing" to "firing"
  triggerReleased: boolean; // will be true only when switching from "firing" to "not firing"
  moving: boolean;
  nextWeapon: boolean;
  previousWeapon: boolean;

  constructor(player: Player) {
    this.player = player;
    this.direction = Directions.Up;
    this.dying = false;
    this.dyingAnimationCountDown = 0;
    this.invincible = false;
    this.invincibilityCountDown = 0;
    this.moving = false;
    this.firing = false;
    this.triggerPressed = false;
    this.triggerReleased = false;
    this.nextWeapon = false;
    this.previousWeapon = false;
    this.timeSinceLastBullet = 0;
  }

  update = (userInput: InputState) => {
    if (!userInput || !this.player.isAlive()) {
      return;
    }

    const playerWantsToMove =
      userInput.moveUp ||
      userInput.moveDown ||
      userInput.moveLeft ||
      userInput.moveRight;
    this.moving = playerWantsToMove && !(!this.moving && this.firing);
    this.triggerPressed = !this.firing && userInput.fire;
    this.triggerReleased = this.firing && !userInput.fire;
    this.firing = userInput.fire;
    if (playerWantsToMove) {
      this.direction = this.getDirection(
        userInput.moveUp,
        userInput.moveDown,
        userInput.moveLeft,
        userInput.moveRight
      );
    }

    if (!this.nextWeapon && userInput.toggleUp) {
      this.player.selectNextWeapon();
    }
    this.nextWeapon = userInput.toggleUp;

    if (!this.previousWeapon && userInput.toggleDown) {
      this.player.selectPreviousWeapon();
    }
    this.previousWeapon = userInput.toggleDown;
  };

  getDirection = (
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
  ): Directions => {
    if (up && !down && !left && !right) {
      return Directions.Up;
    }
    if (up && !down && left && !right) {
      return Directions.UpLeft;
    }
    if (up && !down && !left && right) {
      return Directions.UpRight;
    }
    if (!up && down && !left && !right) {
      return Directions.Down;
    }
    if (!up && down && left && !right) {
      return Directions.DownLeft;
    }
    if (!up && down && !left && right) {
      return Directions.DownRight;
    }
    if (!up && !down && left && !right) {
      return Directions.Left;
    }
    if (!up && !down && !left && right) {
      return Directions.Right;
    }
    return this.direction;
  };
}
