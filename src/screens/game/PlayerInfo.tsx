import React from "react";
import { Player, PlayerProperties, Players } from "../../game/Player";
import ChangeListener from "../../game/ChangeListener";

import styles from "./PlayerInfo.module.css";
import { Weapon } from "../../game/Weapons";
import { Grenade } from "../../game/Grenades";

export interface PlayerInfoProps {
  player: number;
}

export interface PlayerInfoState {
  ammunition: number;
  lives: number;
  score: number;
  selectedWeapon: Weapon | Grenade | undefined;
}

function playerToState(player: Player) {
  const { lives, score } = player;
  return {
    ammunition: player.getAmmunitionCountForSelectedWeapon(),
    lives,
    score,
    selectedWeapon: player.getSelectedWeapon(),
  };
}

export default class PlayerInfo extends React.Component<
  PlayerInfoProps,
  PlayerInfoState
> {
  player: Player;
  playerChangeListener: ChangeListener<any>;

  constructor(props: PlayerInfoProps) {
    super(props);
    this.player = Players[props.player];
    this.playerChangeListener = new ChangeListener(
      this.playerDataChanged,
      PlayerProperties.Ammunition,
      PlayerProperties.Grenades,
      PlayerProperties.Lives,
      PlayerProperties.Score,
      PlayerProperties.SelectedWeapon
    );
    this.state = playerToState(this.player);
  }

  componentDidMount() {
    this.player.addChangeListener(this.playerChangeListener);
  }

  componentWillUnmount() {
    this.player.removeChangeListener(this.playerChangeListener);
  }

  render() {
    const weaponImage = this.state.selectedWeapon ? (
      <img
        alt={`Selected weapon of player ${this.props.player + 1}`}
        className={styles.selectedWeapon}
        src={this.state.selectedWeapon.imageRotated}
      />
    ) : null;

    const liveImages = [];
    for (let i = 0; i < this.state.lives; i++) {
      const path = `images/backgrounds/life-player-${
        this.props.player + 1
      }.png`;
      liveImages.push(<img key={`life-${i}`} src={path} alt="" />);
    }

    return (
      <div className={styles.playerInfo}>
        <img
          alt={`Portrait of player ${this.props.player + 1}`}
          className={styles.playerPortrait}
          src={`images/backgrounds/portrait-player-${
            this.props.player + 1
          }.jpg`}
        />

        <div className={styles.scoreContainer}>
          <h2>{this.state.score}</h2>
        </div>

        <div className={styles.weaponContainer}>
          {weaponImage}
          <h2>{this.state.ammunition}</h2>
        </div>

        <div className={styles.livesContainer}>
          {0 < this.state.lives ? liveImages : "M.I.A."}
        </div>
      </div>
    );
  }

  playerDataChanged = () => {
    this.setState(playerToState(this.player));
  };
}
