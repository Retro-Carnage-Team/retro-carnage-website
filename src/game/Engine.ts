import InputController from "./InputController";
import InventoryController from "./InventoryController";
import PlayerController from "./PlayerController";
import PlayerBehavior from "./PlayerBehavior";
import Rectangle from "./Rectangle";
import { updatePlayerMovement } from "./PlayerMovement";
import Explosive from "./Explosive";
import Explosion from "./Explosion";
import SoundBoard, {
  FX_DEATH_PLAYER_1,
  FX_DEATH_PLAYER_2,
  FX_GRENADE_1,
} from "./SoundBoard";
import LevelController from "./LevelController";
import { Mission } from "./Missions";
import Offset from "./Offset";
import { Grenade } from "./Grenades";
import { DURATION_OF_DEATH_ANIMATION } from "./PlayerTileSupplier";
import Bullet from "./Bullet";
import { Weapon } from "./Weapons";
import { ActiveEnemy } from "./Enemy";

export const EXPLOSION_HIT_RECT_HEIGHT = 200;
export const EXPLOSION_HIT_RECT_WIDTH = 200;
export const PLAYER_HIT_RECT_HEIGHT = 200;
export const PLAYER_HIT_RECT_WIDTH = 90;
export const SCREEN_SIZE = 1500;

export default class Engine {
  bullets: Bullet[];
  enemies: ActiveEnemy[];
  explosives: Explosive[];
  explosions: Explosion[];
  levelController: LevelController;
  lost: boolean;
  mission: Mission;
  playerBehaviors: PlayerBehavior[];
  playerPositions: Rectangle[];
  won: boolean;

  constructor(mission: Mission) {
    this.mission = mission;
    this.levelController = new LevelController(mission.segments);
    this.playerBehaviors = PlayerController.getConfiguredPlayers().map(
      (p) => new PlayerBehavior(p)
    );
    this.playerPositions = PlayerController.getConfiguredPlayers().map(
      (p, idx) =>
        new Rectangle(
          500 + idx * 500,
          1200,
          PLAYER_HIT_RECT_WIDTH,
          PLAYER_HIT_RECT_HEIGHT
        )
    );
    this.bullets = [];
    this.enemies = [];
    this.explosives = [];
    this.explosions = [];
    this.lost = false;
    this.won = false;
  }

  initializeGameState = () => {};

  getBackgrounds = () => {
    return this.levelController.getVisibleTiles();
  };

  updateGameState = (elapsedTimeInMs: number) => {
    this.updatePlayerBehavior(elapsedTimeInMs);
    this.updatePlayerPositionWithMovement(elapsedTimeInMs);
    this.updateEnemies(elapsedTimeInMs);
    this.updateBullet(elapsedTimeInMs);
    this.updateExplosions(elapsedTimeInMs);
    this.updateExplosives(elapsedTimeInMs);
    this.handleWeaponAction(elapsedTimeInMs);

    this.checkForDeadlyCollisions();
    this.checkIfPlayerReachedLevelGoal();

    const scrollOffsets = this.levelController.updatePosition(
      elapsedTimeInMs,
      this.playerPositions
    );
    this.updateAllPositionsWithScrollOffset(scrollOffsets);

    const activatedEnemies = this.levelController.getActivatedEnemies();
    if (0 < activatedEnemies.length) {
      this.enemies.push(
        ...activatedEnemies.map((e) => new ActiveEnemy(e, e.viewingDirection))
      );
    }
  };

  updatePlayerBehavior = (elapsedTimeInMs: number) => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (behavior.dying) {
        behavior.dyingAnimationCountDown -= Math.floor(elapsedTimeInMs);
        if (0 >= behavior.dyingAnimationCountDown) {
          behavior.dying = false;
          behavior.dyingAnimationCountDown = 0;
          PlayerController.killPlayer(p.index);
          if (p.isAlive()) {
            behavior.invincible = true;
            behavior.invincibilityCountDown = 1500;
          }
        }
      } else {
        if (behavior.invincible) {
          behavior.invincibilityCountDown -= Math.floor(elapsedTimeInMs);
          if (0 >= behavior.invincibilityCountDown) {
            behavior.invincible = false;
            behavior.invincibilityCountDown = 0;
          }
        }
        const inputState = InputController.inputProviders[p.index]();
        if (inputState && !behavior.dying) {
          behavior.update(inputState);
        }
      }
    });

    this.lost = 0 === PlayerController.getRemainingPlayers().length;
  };

  updatePlayerPositionWithMovement = (elapsedTimeInMs: number) => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (!behavior.dying && behavior.moving) {
        const oldPosition = this.playerPositions[p.index];
        this.playerPositions[p.index] = updatePlayerMovement(
          elapsedTimeInMs,
          behavior.direction,
          oldPosition
        );
      }
    });
  };

  updateEnemies = (elapsedTimeInMs: number) => {
    this.enemies.forEach((activeEnemy) => {
      let remaining = elapsedTimeInMs;
      let currentMovement = activeEnemy.enemy.movements.find(
        (m) => m.timeElapsed < m.duration
      );
      while (currentMovement && 0 < remaining) {
        const duration = Math.min(
          remaining,
          currentMovement.duration - currentMovement.timeElapsed
        );
        console.log(remaining, duration, activeEnemy.enemy.position);
        activeEnemy.enemy.position.add({
          x: duration * currentMovement.offsetXPerMs,
          y: duration * currentMovement.offsetYPerMs,
        });
        remaining -= duration;
        currentMovement.timeElapsed += duration;
        if (0 < remaining) {
          currentMovement = activeEnemy.enemy.movements.find(
            (m) => m.timeElapsed < m.duration
          );
        }
      }
    });
  };

  updateExplosions = (elapsedTimeInMs: number) => {
    this.explosions = this.explosions.filter((explosion) => {
      explosion.duration += elapsedTimeInMs;
      return explosion.duration < 1_200;
    });
  };

  updateExplosives = (elapsedTimeInMs: number) => {
    this.explosives = this.explosives.filter((explosive) => {
      const done = explosive.move(elapsedTimeInMs);
      if (done) {
        this.explosions.push(new Explosion(explosive));
        SoundBoard.play(FX_GRENADE_1);
      }
      return !done;
    });
  };

  updateBullet = (elapsedTimeInMs: number) => {
    this.bullets = this.bullets.filter(
      (bullet) => !bullet.move(elapsedTimeInMs)
    );
  };

  updateAllPositionsWithScrollOffset = (scrollOffset: Offset) => {
    this.playerPositions.forEach((pos) => pos.subtract(scrollOffset));
    this.explosives.forEach((exp) => exp.position.subtract(scrollOffset));
    this.explosions.forEach((exp) => exp.position.subtract(scrollOffset));
    this.enemies.forEach((anmy) => anmy.enemy.position.subtract(scrollOffset));
    this.bullets.forEach((bul) => bul.position.subtract(scrollOffset));
  };

  handleWeaponAction = (elapsedTimeInMs: number) => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (
        !behavior.dying &&
        behavior.triggeredFire &&
        (p.isGrenadeSelected() || p.isRpgSelected())
      ) {
        // TODO: handle RPGs
        if (InventoryController.removeAmmunition(p.index)) {
          const position = this.playerPositions[p.index];
          this.explosives.push(
            new Explosive(position, behavior, p.getSelectedWeapon() as Grenade)
          );
        }
      } else if (!behavior.dying) {
        if (behavior.triggeredFire && p.isPistolSelected()) {
          const weapon = p.getSelectedWeapon() as Weapon;
          if (InventoryController.removeAmmunition(p.index)) {
            const position = this.playerPositions[p.index];
            this.bullets.push(new Bullet(position, behavior, weapon));
          }
        } else {
          // TODO: handle automatic fire arms, flamethrowers and all the other fun items :)
        }
      }
    });
  };

  // Check if players collide with explosions / bullets / enemies
  checkForDeadlyCollisions = () => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (!behavior.dying && !behavior.invincible) {
        const playerPosition = this.playerPositions[p.index];
        let death = false;

        this.explosions.forEach((explosion) => {
          death =
            death ||
            null !== playerPosition.getIntersection(explosion.position);
        });

        // TODO: check for collisions with enemy soldiers
        // TODO: check for collisions with flying bullets

        if (death) {
          SoundBoard.play(
            0 === p.index ? FX_DEATH_PLAYER_1 : FX_DEATH_PLAYER_2
          );
          behavior.dying = true;
          behavior.dyingAnimationCountDown = DURATION_OF_DEATH_ANIMATION;
        }
      }
    });
  };

  // TODO: Check if players reached the level's goal area
  checkIfPlayerReachedLevelGoal = () => {
    if (this.levelController.isGoalReached(this.playerPositions)) {
      this.won = true;
    }
  };
}
