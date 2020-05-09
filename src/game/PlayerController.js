import Players from './Player';

class PlayerController {

  constructor() {
    this.numberOfPlayers = null;
  }

  getAllPlayers = () => {
    return Players;
  }

  getRemainingPlayers = () => {
    const unfiltered = (1 === this.numberOfPlayers) ? [Players[0]] : Players;
    return unfiltered.filter((p) => p.isAlive());
  }

}

const playerControllerInstance = new PlayerController();
export default playerControllerInstance;
