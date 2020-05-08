import InputController from '../InputController';
import PlayerController from '../PlayerController';

export default class Engine {

  constructor(mission) {
    this.mission = mission;
    this.missionSegment = mission.segments[0];
  }

  initializeGameState = () => {

  }

  updateGameState = () => {
    PlayerController.getRemainingPlayers().map((player) =>
      console.log(player.name, InputController.inputProviders[player.index]())
    );
  }

}