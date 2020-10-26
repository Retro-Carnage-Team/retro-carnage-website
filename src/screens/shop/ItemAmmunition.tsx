import React from "react";
import cn from "classnames";

import InventoryController from "../../game/InventoryController";
import InventoryStatusbar from "./InventoryStatusbar";
import { Ammunition } from "../../game/Ammunition";

import styles from "./ItemAmmunition.module.css";

export interface ItemAmmunitionProps {
  ammunition: Ammunition;
  onClick(ammunition: Ammunition): void;
  player: number;
  selected: boolean;
}

export default function ItemAmmunition(props: ItemAmmunitionProps) {
  return (
    <div
      className={cn(
        styles.itemAmmunition,
        props.selected ? styles.selected : null
      )}
      onClick={() => props.onClick(props.ammunition)}
    >
      <img
        className={styles.itemAmmunitionImage}
        src={props.ammunition.image}
        alt=""
      />
      <InventoryStatusbar
        current={InventoryController.getAmmunitionCount(
          props.player,
          props.ammunition.name
        )}
        max={props.ammunition.maxCount}
      />
    </div>
  );
}
