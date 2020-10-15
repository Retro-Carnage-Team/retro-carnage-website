import InputController from "./InputController";
import InventoryController from "./InventoryController";
import PlayerController from "./PlayerController";
import PlayerBehavior from "./PlayerBehavior";
import Rectangle from "./Rectangle";
import { updatePlayerMovement } from "./PlayerMovement";
import Explosive, {
  ExplosiveGrenade,
  ExplosiveRPG,
  GRENADE_HEIGHT,
  GRENADE_WIDTH,
  RPG_HEIGHT,
  RPG_WIDTH,
} from "./Explosive";
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
import { Player } from "./Player";

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
    this.updateBullets(elapsedTimeInMs, obstacles);
    this.updateExplosions(elapsedTimeInMs);
    this.updateExplosives(elapsedTimeInMs, obstacles);
    this.handleWeaponAction(elapsedTimeInMs);

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
    function updateDeathAnimationCountDown(enemy: ActiveEnemy): ActiveEnemy {
      if (enemy.dying) {
        enemy.dyingAnimationCountDown -= Math.floor(elapsedTimeInMs);
      }
      return enemy;
    }

    this.enemies = this.enemies
      .map(updateDeathAnimationCountDown)
      .filter((enemy) => !enemy.dying || 0 <= enemy.dyingAnimationCountDown);

    this.enemies
      .filter((e) => !e.dying && EnemyType.Person === e.type)
      .forEach((enemy) => {
        let remaining = elapsedTimeInMs;
        let currentMovement = enemy.movements.find(
          (m) => m.timeElapsed < m.duration
        );
        while (currentMovement && 0 < remaining) {
          const duration = Math.min(
            remaining,
            currentMovement.duration - currentMovement.timeElapsed
          );
          enemy.position.add({
            x: duration * currentMovement.offsetXPerMs,
            y: duration * currentMovement.offsetYPerMs,
          });
          remaining -= duration;
          currentMovement.timeElapsed += duration;
          if (0 < remaining) {
            currentMovement = enemy.movements.find(
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

  updateExplosives = (elapsedTimeInMs: number, obstacles: Rectangle[]) => {
    this.explosives = this.explosives.filter((explosive) => {
      let done = explosive.move(elapsedTimeInMs);
      if (!done && explosive.explodesOnContact) {
        const collision = obstacles.find((obstacle) =>
          obstacle.getIntersection(explosive.position)
        );
        done = !!collision;
      }
      if (done) {
        this.detonateExplosive(explosive);
      }
      return !done;
    });
  };

  detonateExplosive = (explosive: Explosive) => {
    this.explosions.push(new Explosion(explosive));
    SoundBoard.play(FX_GRENADE_1);
  };

  updateBullets = (elapsedTimeInMs: number, obstacles: Rectangle[]) => {
    this.bullets = this.bullets.filter((bullet) => {
      const reachedRange = bullet.move(elapsedTimeInMs);
      const hitObstacle = !!obstacles.find((o) =>
        o.getIntersection(bullet.position)
      );
      return !(reachedRange || hitObstacle);
    });
  };

  updateAllPositionsWithScrollOffset = (scrollOffset: Point) => {
    this.playerPositions.forEach((pos) => pos.subtract(scrollOffset));
    this.explosives.forEach((exp) => exp.position.subtract(scrollOffset));
    this.explosions.forEach((exp) => exp.position.subtract(scrollOffset));
    this.enemies.forEach((anmy) => anmy.position.subtract(scrollOffset));
    this.bullets.forEach((bul) => bul.position.subtract(scrollOffset));
  };

  handleWeaponAction = (elapsedTimeInMs: number) => {
    const _this = this;
    function fireBullet(p: Player, behavior: PlayerBehavior): void {
      const weapon = p.getSelectedWeapon() as Weapon;
      const position = _this.playerPositions[p.index];
      const bullet = new Bullet(p.index, position, behavior.direction, weapon);
      bullet.applyOffset(
        0 === p.index ? BulletOffsetForPlayer0 : BulletOffsetForPlayer1
      );
      _this.bullets.push(bullet);
    }

    PlayerController.getRemainingPlayers().forEach((p) => {
      const behavior = this.playerBehaviors[p.index];
      if (!behavior.dying) {
        const playerPosition = this.playerPositions[p.index];
        if (behavior.triggeredFire) {
          if (
            p.isGrenadeSelected() &&
            InventoryController.removeAmmunition(p.index)
          ) {
            this.explosives.push(
              new ExplosiveGrenade(
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
          } else if (
            p.isRpgSelected() &&
            InventoryController.removeAmmunition(p.index)
          ) {
            const weapon = p.getSelectedWeapon() as Weapon;
            if (weapon.sound) SoundBoard.play(weapon.sound);
            this.explosives.push(
              new ExplosiveRPG(
                p.index,
                new Rectangle(
                  playerPosition.x,
                  playerPosition.y,
                  RPG_WIDTH,
                  RPG_HEIGHT
                ),
                behavior.direction,
                p.getSelectedWeapon() as Weapon
              )
            );
          } else if (
            (p.isPistolSelected() || p.isAutomaticWeaponSelected()) &&
            InventoryController.removeAmmunition(p.index)
          ) {
            const weapon = p.getSelectedWeapon() as Weapon;
            if (weapon.sound) SoundBoard.play(weapon.sound);
            fireBullet(p, behavior);
            behavior.timeSinceLastBullet = 0;
          }
        } else if (
          behavior.firing &&
          p.isAutomaticWeaponSelected() &&
          InventoryController.removeAmmunition(p.index)
        ) {
          behavior.timeSinceLastBullet += elapsedTimeInMs;
          const weapon = p.getSelectedWeapon() as Weapon;
          if (
            null !== weapon.bulletInterval &&
            weapon.bulletInterval >= behavior.timeSinceLastBullet
          ) {
            behavior.timeSinceLastBullet = 0;
            fireBullet(p, behavior);
          }
        } else if (behavior.untriggeredFire && p.isAutomaticWeaponSelected()) {
          const weapon = p.getSelectedWeapon() as Weapon;
          SoundBoard.stop(weapon.sound!);
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
          if (death) {
            console.log("Enemy killed by explosion");
          }
        });

        if (EnemyType.Person === enemy.type) {
          // Bullets, flamethrowers and RPGs are useful only against persons
          this.bullets.forEach((bullet) => {
            const deadlyShot =
              null !== enemy.position.getIntersection(bullet.position);
            if (deadlyShot) {
              killer = bullet.playerIdx;
            }
            death = death || deadlyShot;
          });

          this.explosives = this.explosives.filter((explosive) => {
            let explode =
              explosive.explodesOnContact &&
              explosive.position.getIntersection(enemy.position);
            if (explode) {
              this.detonateExplosive(explosive);
              death = true;
            }
            return !explode;
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
