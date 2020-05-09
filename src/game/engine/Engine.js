import InputController from '../InputController';
import PlayerController from '../PlayerController';
import PlayerBehavior from './PlayerBehavior';

export default class Engine {

  constructor(mission) {
    this.mission = mission;
    this.missionSegment = mission.segments[0];
    this.playerBehaviors = PlayerController.getAllPlayers.map((p) => new PlayerBehavior(p));
  }

  initializeGameState = () => {

  }

  updateGameState = (elapsedTimeInMs) => {
    this.updatePlayerBehaviorByInput();
  }

  updatePlayerBehaviorByInput = () => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const inputState = InputController.inputProviders[p.index]();
      this.playerBehaviors[p.index].update(inputState);
    });
  }

}