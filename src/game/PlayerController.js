import {Players} from './Player';

class PlayerController {

  constructor() {
    this.numberOfPlayers = null;
  }

  getConfiguredPlayers = () => {
    return (1 === this.numberOfPlayers) ? [Players[0]] : Players;
  }

  getRemainingPlayers = () => {
    return this.getConfiguredPlayers().filter((p) => p.isAlive());
  }

}

const playerControllerInstance = new PlayerController();
export default playerControllerInstance;
