import { Players } from "./Player";

export class PlayerController {
  numberOfPlayers: number | null;

  constructor() {
    this.numberOfPlayers = null;
  }

  getConfiguredPlayers = () => {
    return 1 === this.numberOfPlayers ? [Players[0]] : Players;
  };

  getRemainingPlayers = () => {
    return this.getConfiguredPlayers().filter((p) => p.isAlive());
  };

  killPlayer = (playerIdx: number) => {
    const player = Players[playerIdx];
    player.setLives(player.lives - 1);
  };
}

export default new PlayerController();
