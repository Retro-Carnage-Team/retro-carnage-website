import BackgroundTile from './BackgroundTile';
import InputController from '../InputController';
import InventoryController from '../InventoryController';
import PlayerController from '../PlayerController';
import PlayerBehavior from './PlayerBehavior';
import Rectangle from './Rectangle';
import { updatePlayerMovement } from './PlayerMovement';
import Explosive from './Explosive';
import Explosion from './Explosion';
import SoundBoard, {FX_GRENADE_1} from "../SoundBoard";

export const EXPLOSION_HIT_RECT_HEIGHT = 200;
export const EXPLOSION_HIT_RECT_WIDTH = 200;
export const PLAYER_HIT_RECT_HEIGHT = 200;
export const PLAYER_HIT_RECT_WIDTH = 90;
export const SCREEN_SIZE = 1500;

export default class Engine {

  constructor(mission) {
    this.mission = mission;
    this.missionSegment = mission.segments[0];

    this.backgrounds = [
      new BackgroundTile('images/backgrounds/bg-dummy-1.jpg'),
      new BackgroundTile('images/backgrounds/bg-dummy-2.jpg')
    ];
    this.backgrounds[0].offsetY = -600;
    this.backgrounds[1].offsetY = 900;

    this.playerBehaviors = PlayerController.getConfiguredPlayers().map((p) => new PlayerBehavior(p));
    this.playerPositions = PlayerController.getConfiguredPlayers().map(
      (p, idx) => new Rectangle(500 + idx * 500, 1200, PLAYER_HIT_RECT_WIDTH, PLAYER_HIT_RECT_HEIGHT)
    );

    this.projectiles = [];
    this.explosives = [];
    this.explosions = [];
    // new Rectangle(75, 75, EXPLOSION_HIT_RECT_WIDTH, EXPLOSION_HIT_RECT_HEIGHT)
  }

  initializeGameState = () => {

  }

  updateGameState = (elapsedTimeInMs) => {
    this.updatePlayerBehaviorByInput();
    this.updatePlayerPositionWithMovement(elapsedTimeInMs);
    this.updateExplosions(elapsedTimeInMs);
    this.updateExplosives(elapsedTimeInMs);
    this.handleWeaponAction(elapsedTimeInMs);
  }

  updatePlayerBehaviorByInput = () => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const inputState = InputController.inputProviders[p.index]();
      this.playerBehaviors[p.index].update(inputState);
    });
  }

  updatePlayerPositionWithMovement = (elapsedTimeInMs) => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if(behavior.moving) {
        const oldPosition = this.playerPositions[p.index];
        this.playerPositions[p.index] = updatePlayerMovement(elapsedTimeInMs, behavior.direction, oldPosition);
      }
    });
  }

  updateExplosions = (elapsedTimeInMs) => {
    this.explosions = this.explosions.filter((explosion) => {
      explosion.duration += elapsedTimeInMs;
      return explosion.duration < 1_600;
    });
  }

  updateExplosives = (elapsedTimeInMs) => {
    this.explosives = this.explosives.filter((explosive) => {
      const done = explosive.move(elapsedTimeInMs);
      if(done) {
        this.explosions.push(new Explosion(explosive));
        SoundBoard.play(FX_GRENADE_1);
      }
      return !done;
    });
  }

  handleWeaponAction = (elapsedTimeInMs) => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if(behavior.triggeredFire && (p.isGrenadeSelected() || p.isRpgSelected())) {
        // TODO: handle RPGs
        if(InventoryController.removeAmmunition(p.index)) {
          const position = this.playerPositions[p.index];
          this.explosives.push(new Explosive(position, behavior, p.getSelectedWeapon()));
        }
      } else {
        // TODO: handle fire arms
      }
    });
  }

}