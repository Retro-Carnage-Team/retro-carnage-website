import React from "react";
import styles from "./ItemWeapon.module.css";
import InventoryController from "../../game/InventoryController";
import { Ammunition } from "../../game/Ammunition";
import { Weapon } from "../../game/Weapons";

export interface ItemWeaponProps {
  onMouseEnter: (weapon: Weapon) => void;
  onMouseLeave: () => void;
  player: number;
  selectedAmmunition: Ammunition | null;
  weapon: Weapon;
}

export interface ItemWeaponState {
  mouseOver: boolean;
}

export default class ItemWeapon extends React.Component<
  ItemWeaponProps,
  ItemWeaponState
> {
  constructor(props: ItemWeaponProps) {
    super(props);
    this.state = { mouseOver: false };
  }

  render() {
    const compatible =
      null !== this.props.selectedAmmunition &&
      this.props.selectedAmmunition.name === this.props.weapon.ammo;
    const imgClasses = compatible ? styles.compatible : null;

    let svgClasses = compatible ? styles.compatible : "";
    if (
      InventoryController.isWeaponInInventory(
        this.props.player,
        this.props.weapon.name
      )
    ) {
      svgClasses += " " + styles.purchased;
    }

    return (
      <div
        className={styles.itemWeapon}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          className={imgClasses ? imgClasses : undefined}
          src={this.props.weapon.image}
          alt=""
        />
        <svg
          className={svgClasses}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 
                2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z`}
          />
        </svg>
      </div>
    );
  }

  handleClick = () => {
    InventoryController.buyWeapon(this.props.player, this.props.weapon.name);
  };

  handleMouseEnter = () => {
    this.setState({ mouseOver: true });
    this.props.onMouseEnter(this.props.weapon);
  };

  handleMouseLeave = () => {
    this.setState({ mouseOver: true });
    this.props.onMouseLeave();
  };
}
