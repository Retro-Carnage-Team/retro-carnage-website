import React from "react";
import cn from "classnames";

import InventoryController from "../../game/InventoryController";
import { Weapon } from "../../game/Weapons";

import styles from "./ItemWeapon.module.css";

export interface ItemWeaponProps {
  onClick: (weapon: Weapon) => void;
  player: number;
  selected: boolean;
  weapon: Weapon;
}

export default function ItemWeapon(props: ItemWeaponProps) {
  return (
    <div
      className={cn(styles.itemWeapon, props.selected ? styles.selected : null)}
      onClick={() => props.onClick(props.weapon)}
    >
      <img src={props.weapon.image} alt="" />
      <svg
        className={cn(
          InventoryController.isWeaponInInventory(
            props.player,
            props.weapon.name
          )
            ? styles.purchased
            : null
        )}
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
