import React from "react";
import styles from "./DetailAmmunition.module.css";
import { Ammunition } from "../../game/Ammunition";

export interface DetailAmmunitionProps {
  ammunition: Ammunition;
}

export default function DetailAmmunition(props: DetailAmmunitionProps) {
  return (
    <div className={styles.detailsAmmunitionInner}>
      <table>
        <tbody>
          <tr>
            <td>Price:</td>
            <td className={styles.detailsAmmunitionValue}>
              ${props.ammunition.price}
            </td>
          </tr>
          <tr>
            <td>Package size:</td>
            <td className={styles.detailsAmmunitionValue}>
              {props.ammunition.packageSize}
            </td>
          </tr>
        </tbody>
      </table>
      <p>{props.ammunition.description}</p>
    </div>
  );
}
