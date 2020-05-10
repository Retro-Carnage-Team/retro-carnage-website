import InputController from '../InputController';
import PlayerController from '../PlayerController';
import PlayerBehavior from './PlayerBehavior';
import Rectangle from './Rectangle';

const PLAYER_HEIGHT = 200;
const PLAYER_WIDTH = 90;
export const SCREEN_SIZE = 1500;

export default class Engine {

  constructor(mission) {
    this.mission = mission;
    this.missionSegment = mission.segments[0];
    this.playerBehaviors = PlayerController.getConfiguredPlayers().map((p) => new PlayerBehavior(p));
    this.playerPositions = PlayerController.getConfiguredPlayers().map(
      (p, idx) => new Rectangle(500 + idx * 500, 1200, PLAYER_WIDTH, PLAYER_HEIGHT)
    );
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