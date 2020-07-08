import React from "react";
import styles from "./BottomLine.module.css";

export default class BottomLine extends React.Component {
  render() {
    return (
      <div className={styles.bottomLine}>
        <div className={styles.costLabel}>Cost: </div>
        <div className={styles.costValue}>${this.getCostForSelectedItem()}</div>
        <div className={styles.creditLabel}>Credit: </div>
        <div className={styles.creditValue}>${this.props.player.cash}</div>
        <div className={styles.exitLabel} onClick={this.handleExitClicked}>
          Exit
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

  handleExitClicked = () => {
    this.props.onExit();
  };
}
