import InputController from "./InputController";
import InventoryController from "./InventoryController";
import PlayerController from "./PlayerController";
import PlayerBehavior from "./PlayerBehavior";
import Rectangle from "./Rectangle";
import { updatePlayerMovement } from "./PlayerMovement";
import Explosive, { GRENADE_HEIGHT, GRENADE_WIDTH } from "./Explosive";
import Explosion from "./Explosion";
import SoundBoard, {
  FX_DEATH_ENEMIES,
  FX_DEATH_PLAYER_1,
  FX_DEATH_PLAYER_2,
  FX_GRENADE_1,
  FX_GRENADE_2,
} from "./SoundBoard";
import LevelController from "./LevelController";
import { Mission } from "./Missions";
import Point from "./Point";
import { Grenade } from "./Grenades";
import {
  DURATION_OF_DEATH_ANIMATION_PLAYER_0,
  DURATION_OF_DEATH_ANIMATION_PLAYER_1,
} from "./PlayerTileSupplier";
import { DURATION_OF_DEATH_ANIMATION_ENEMY } from "./EnemyTileSupplier";
import Bullet, {
  BulletOffsetForPlayer0,
  BulletOffsetForPlayer1,
} from "./Bullet";
import { Weapon } from "./Weapons";
import { ActiveEnemy, EnemyType } from "./Enemy";

export const EXPLOSION_HIT_RECT_HEIGHT = 200;
export const EXPLOSION_HIT_RECT_WIDTH = 200;
export const PLAYER_HIT_RECT_HEIGHT = 150;
export const PLAYER_HIT_RECT_WIDTH = 90;
export const SCREEN_SIZE = 1500;

export default class Engine {
  bullets: Bullet[];
  enemies: ActiveEnemy[];
  explosives: Explosive[];
  explosions: Explosion[];
  kills: number[];
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
    this.kills = PlayerController.getConfiguredPlayers().map(() => 0);
    this.lost = false;
    this.won = false;
  }

  initializeGameState = () => {};

  getBackgrounds = () => {
    return this.levelController.getVisibleTiles();
  };

  updateGameState = (elapsedTimeInMs: number) => {
    this.updatePlayerBehavior(elapsedTimeInMs);
    const obstacles = this.levelController.getObstaclesOnScreen();
    this.updatePlayerPositionWithMovement(elapsedTimeInMs, obstacles);
    this.updateEnemies(elapsedTimeInMs);
    this.updateBullet(elapsedTimeInMs);
    this.updateExplosions(elapsedTimeInMs);
    this.updateExplosives(elapsedTimeInMs);
    this.handleWeaponAction();

    this.checkPlayersForDeadlyCollisions();
    this.checkEnemiesForDeadlyCollisions();
    this.checkIfPlayerReachedLevelGoal();

    const scrollOffsets = this.levelController.updatePosition(
      elapsedTimeInMs,
      this.playerPositions
    );
    this.updateAllPositionsWithScrollOffset(scrollOffsets);

    const activatedEnemies = this.levelController.getActivatedEnemies();
    if (0 < activatedEnemies.length) {
      this.enemies.push(...activatedEnemies.map((e) => new ActiveEnemy(e)));
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

  updatePlayerPositionWithMovement = (
    elapsedTimeInMs: number,
    obstacles: Rectangle[]
  ) => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (!behavior.dying && behavior.moving) {
        const oldPosition = this.playerPositions[p.index];
        this.playerPositions[p.index] = updatePlayerMovement(
          elapsedTimeInMs,
          behavior.direction,
          oldPosition,
          obstacles
        );
      }
    });
  };

  updateEnemies = (elapsedTimeInMs: number) => {
    this.enemies = this.enemies.filter(
      (activeEnemy) =>
        !activeEnemy.dying ||
        0 >= activeEnemy.dyingAnimationCountDown
    );

    this.enemies
      .filter((activeEnemy) => EnemyType.Person === activeEnemy.type)
      .forEach((activeEnemy) => {
        if (activeEnemy.dying) {
          activeEnemy.dyingAnimationCountDown -= Math.floor(
            elapsedTimeInMs
          );
        } else {
          let remaining = elapsedTimeInMs;
          let currentMovement = activeEnemy.movements.find(
            (m) => m.timeElapsed < m.duration
          );
          while (currentMovement && 0 < remaining) {
            const duration = Math.min(
              remaining,
              currentMovement.duration - currentMovement.timeElapsed
            );
            activeEnemy.position.add({
              x: duration * currentMovement.offsetXPerMs,
              y: duration * currentMovement.offsetYPerMs,
            });
            remaining -= duration;
            currentMovement.timeElapsed += duration;
            if (0 < remaining) {
              currentMovement = activeEnemy.movements.find(
                (m) => m.timeElapsed < m.duration
              );
            }
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

  updateAllPositionsWithScrollOffset = (scrollOffset: Point) => {
    this.playerPositions.forEach((pos) => pos.subtract(scrollOffset));
    this.explosives.forEach((exp) => exp.position.subtract(scrollOffset));
    this.explosions.forEach((exp) => exp.position.subtract(scrollOffset));
    this.enemies.forEach((anmy) => anmy.position.subtract(scrollOffset));
    this.bullets.forEach((bul) => bul.position.subtract(scrollOffset));
  };

  handleWeaponAction = () => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (
        !behavior.dying &&
        behavior.triggeredFire &&
        (p.isGrenadeSelected() || p.isRpgSelected())
      ) {
        // TODO: handle RPGs
        if (InventoryController.removeAmmunition(p.index)) {
          const playerPosition = this.playerPositions[p.index];
          this.explosives.push(
            new Explosive(
              p.index,
              new Rectangle(
                playerPosition.x,
                playerPosition.y,
                GRENADE_WIDTH,
                GRENADE_HEIGHT
              ),
              behavior.direction,
              p.getSelectedWeapon() as Grenade
            )
          );
        }
      } else if (!behavior.dying) {
        if (behavior.triggeredFire && p.isPistolSelected()) {
          const weapon = p.getSelectedWeapon() as Weapon;
          if (InventoryController.removeAmmunition(p.index)) {
            const position = this.playerPositions[p.index];
            const bullet = new Bullet(
              p.index,
              position,
              behavior.direction,
              weapon
            );
            bullet.applyOffset(
              0 === p.index ? BulletOffsetForPlayer0 : BulletOffsetForPlayer1
            );
            this.bullets.push(bullet);
          }
        } else {
          // TODO: handle automatic fire arms, flamethrowers and all the other fun items :)
        }
      }
    });
  };

  // Check if players collide with explosions / bullets / enemies
  checkPlayersForDeadlyCollisions = () => {
    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (!behavior.dying && !behavior.invincible) {
        const rect = this.playerPositions[p.index];
        let death = false;
        this.enemies.forEach((enemy) => {
          const collisionWithEnemy = rect.getIntersection(enemy.position);
          if (collisionWithEnemy) {
            if (EnemyType.Landmine === enemy.type) {
              this.explosions.push(
                new Explosion({
                  playerIdx: null,
                  position: enemy.position,
                })
              );
              SoundBoard.play(FX_GRENADE_2);
            }
            death = true;
          }
        });
        this.explosions.forEach((explosion) => {
          death = death || null !== rect.getIntersection(explosion.position);
        });
        this.bullets.forEach((bullet) => {
          death = death || null !== rect.getIntersection(bullet.position);
        });
        if (death) {
          SoundBoard.play(
            0 === p.index ? FX_DEATH_PLAYER_1 : FX_DEATH_PLAYER_2
          );
          behavior.dying = true;
          behavior.dyingAnimationCountDown =
            0 === p.index
              ? DURATION_OF_DEATH_ANIMATION_PLAYER_0
              : DURATION_OF_DEATH_ANIMATION_PLAYER_1;
        }
      }
    });
  };

  // Check if players collide with explosions / bullets / enemies
  checkEnemiesForDeadlyCollisions = () => {
    this.enemies.forEach((enemy) => {
      if (!enemy.dying) {
        let death = false;
        let killer = null;
        this.explosions.forEach((explosion) => {
          const deadlyExplosion =
            null !== enemy.position.getIntersection(explosion.position);
          if (deadlyExplosion) {
            killer = explosion.playerIdx;
          }
          death = death || deadlyExplosion;
        });

        // Bullets are useful only against persons
        if (EnemyType.Person === enemy.type) {
          this.bullets.forEach((bullet) => {
            const deadlyShot =
              null !== enemy.position.getIntersection(bullet.position);
            if (deadlyShot) {
              killer = bullet.playerIdx;
            }
            death = death || deadlyShot;
          });
        }

        if (death) {
          enemy.dying = true;
          enemy.dyingAnimationCountDown = 1;
          if (null !== killer) {
            this.kills[killer] += 1;
          }
          if (EnemyType.Person === enemy.type) {
            SoundBoard.play(
              FX_DEATH_ENEMIES[Math.floor(Math.random() * Math.floor(8))]
            );
            enemy.dyingAnimationCountDown = DURATION_OF_DEATH_ANIMATION_ENEMY;
          }
        }
      }
    });
  };

  checkIfPlayerReachedLevelGoal = () => {
    if (this.levelController.isGoalReached(this.playerPositions)) {
      this.won = true;
    }
  };
}
