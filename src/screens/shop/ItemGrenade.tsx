import React from "react";
import styles from "./ItemGrenade.module.css";
import InventoryController from "../../game/InventoryController";
import InventoryStatusbar from "./InventoryStatusbar";
import { Grenade } from "../../game/Grenades";

export interface ItemGrenadeProps {
  grenade: Grenade;
  onMouseEnter: (ammo: Grenade) => void;
  onMouseLeave: () => void;
  player: number;
}

export default function ItemGrenade(props: ItemGrenadeProps) {
  function handleClick() {
    InventoryController.buyGrenade(props.player, props.grenade.name);
  }

  function handleMouseEnter() {
    props.onMouseEnter(props.grenade);
  }

  function handleMouseLeave() {
    props.onMouseLeave();
  }

  return (
    <div
      className={styles.itemGrenade}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
