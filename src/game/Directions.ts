export enum Directions {
  Up = "up",
  UpRight = "up_right",
  Right = "right",
  DownRight = "down_right",
  Down = "down",
  DownLeft = "down_left",
  Left = "left",
  UpLeft = "up_left",
}

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

export function getDirectionForCardinals(
  up: boolean,
  down: boolean,
  left: boolean,
  right: boolean
): Directions | undefined {
  return DirectionChecks.find((check) =>
    check.check(up, down, left, right)
  )?.getDirection();
}
