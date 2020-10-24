import React from "react";
import styles from "./DetailGrenade.module.css";
import { Grenade } from "../../game/Grenades";

export interface DetailGrenadeProps {
  grenade: Grenade;
}

export default function DetailGrenade(props: DetailGrenadeProps) {
  return (
    <div className={styles.detailsGrenadeInner}>
      <table>
        <tbody>
          <tr>
            <td>Price:</td>
            <td className={styles.detailsGrenadeValue}>
              {props.grenade.price}
            </td>
            <td className={styles.detailsGrenadeSpacer} />
            <td>Package size:</td>
            <td className={styles.detailsGrenadeValue}>
              {props.grenade.packageSize}
            </td>
          </tr>
          <tr>
            <td>Range:</td>
            <td className={styles.detailsGrenadeValue}>
              {props.grenade.range}
            </td>
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      <p>{props.grenade.description}</p>
    </div>
  );
}
