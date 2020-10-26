import React from "react";
import cn from "classnames";

import { Player } from "../../game/Player";
import { Ammunition } from "../../game/Ammunition";
import { Grenade } from "../../game/Grenades";
import { Weapon } from "../../game/Weapons";

import styles from "./BottomLine.module.css";

export interface BottomLineProps {
  onExit: () => void;
  player: Player;
  selectedAmmunition: Ammunition | null;
  selectedGrenade: Grenade | null;
  selectedWeapon: Weapon | null;
}

export default class BottomLine extends React.Component<BottomLineProps> {
  render() {
    return (
      <div className={styles.bottomLine}>
        <div className={styles.costLabel}>Cost: </div>
        <div className={styles.costValue}>${this.getCostForSelectedItem()}</div>
        <div className={styles.creditLabel}>Credit: </div>
        <div className={styles.creditValue}>${this.props.player.cash}</div>
        <div
          className={cn(
            styles.exitLabel,
            this.isExitSelected() ? styles.selected : null
          )}
          onClick={this.handleExitClicked}
        >
          Exit shop
        </div>
      </div>
    );
  }

  getCostForSelectedItem = () => {
    let result = 0;
    if (null !== this.props.selectedAmmunition) {
      result = this.props.selectedAmmunition.price;
    } else if (null !== this.props.selectedGrenade) {
      result = this.props.selectedGrenade.price;
    } else if (null !== this.props.selectedWeapon) {
      result = this.props.selectedWeapon.price;
    }
    return result;
  };

  isExitSelected = (): boolean => {
    return (
      null === this.props.selectedAmmunition &&
      null === this.props.selectedGrenade &&
      null === this.props.selectedWeapon
    );
  };

  handleExitClicked = () => {
    this.props.onExit();
  };
}
