import { Directions } from "./Directions";
import { Player } from "./Player";
import InputState from "./InputState";

interface DirectionCheck {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean;
  getDirection(): Directions;
}

const DirectionCheckUp: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return up && !down && !left && !right;
  },
  getDirection(): Directions {
    return Directions.Up;
  },
};

const DirectionCheckUpLeft: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return up && !down && left && !right;
  },
  getDirection(): Directions {
    return Directions.UpLeft;
  },
};

const DirectionCheckUpRight: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return up && !down && !left && right;
  },
  getDirection(): Directions {
    return Directions.UpRight;
  },
};

const DirectionCheckDown: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return !up && down && !left && !right;
  },
  getDirection(): Directions {
    return Directions.Down;
  },
};

const DirectionCheckDownLeft: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return !up && down && left && !right;
  },
  getDirection(): Directions {
    return Directions.DownLeft;
  },
};

const DirectionCheckDownRight: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return !up && down && !left && right;
  },
  getDirection(): Directions {
    return Directions.DownRight;
  },
};

const DirectionCheckLeft: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return !up && !down && left && !right;
  },
  getDirection(): Directions {
    return Directions.Left;
  },
};

const DirectionCheckRight: DirectionCheck = {
  check(up: boolean, down: boolean, left: boolean, right: boolean): boolean {
    return !up && !down && !left && right;
  },
  getDirection(): Directions {
    return Directions.Right;
  },
};

const DirectionChecks: DirectionCheck[] = [
  DirectionCheckUp,
  DirectionCheckUpLeft,
  DirectionCheckUpRight,
  DirectionCheckDown,
  DirectionCheckDownLeft,
  DirectionCheckDownRight,
  DirectionCheckLeft,
  DirectionCheckRight,
];

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
    const direction = DirectionChecks.find((check) =>
      check.check(up, down, left, right)
    )?.getDirection();
    return direction ? direction : this.direction;
  };
}
