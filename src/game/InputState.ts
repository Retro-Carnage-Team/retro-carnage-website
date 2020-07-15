export default class InputState {
  public moveUp: boolean;
  public moveDown: boolean;
  public moveLeft: boolean;
  public moveRight: boolean;
  public fire: boolean;
  public grenade: boolean;
  public toggleUp: boolean;
  public toggleDown: boolean;

  public constructor() {
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.fire = false;
    this.grenade = false;
    this.toggleUp = false;
    this.toggleDown = false;
  }
}
