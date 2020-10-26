import React from "react";
import cn from "classnames";

import InventoryController from "../../game/InventoryController";
import InventoryStatusbar from "./InventoryStatusbar";
import { Grenade } from "../../game/Grenades";

import styles from "./ItemGrenade.module.css";

export interface ItemGrenadeProps {
  grenade: Grenade;
  onClick: (grenade: Grenade) => void;
  player: number;
  selected: boolean;
}

export default function ItemGrenade(props: ItemGrenadeProps) {
  return (
    <div
      className={cn(
        styles.itemGrenade,
        props.selected ? styles.selected : null
      )}
      onClick={() => props.onClick(props.grenade)}
    >
      <img
        className={styles.itemGrenadeImage}
        src={props.grenade.image}
        alt=""
      />
      <InventoryStatusbar
        current={InventoryController.getGrenadeCount(
          props.player,
          props.grenade.name
        )}
        max={props.grenade.maxCount}
      />
    </div>
  );
}
