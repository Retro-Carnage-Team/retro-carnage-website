import React from "react";
import styles from "./InventoryStatusbar.module.css";

export interface InventoryStatusbarProps {
  current: number;
  max: number;
}

export default function InventoryStatusbar(props: InventoryStatusbarProps) {
  const status =
    0 === props.current ? "0%" : `${(props.current * 100) / props.max}%`;
  return (
    <div className={styles.inventoryStatusbar}>
      <div className={styles.status} style={{ width: status }} />
    </div>
  );
}
