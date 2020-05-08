import InputController from '../InputController';
import Players from '../Player';

export default class Engine {

  constructor(mission) {
    this.mission = mission;
    this.missionSegment = mission.segments[0];
  }

  initializeGameState = () => {

  }

  updateGameState = () => {
    Players.map((player, idx) =>
      console.log(idx, InputController.inputProviders[idx]())
    );
  }

}