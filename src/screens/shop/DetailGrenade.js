import React from "react";
import styles from "./DetailGrenade.module.css";

export default function DetailGrenade(props) {
  return (
    <div className={styles.detailsGrenadeInner}>
      <h2>{props.grenade.name}</h2>
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
            <td className={styles.detailsGrenadeSpacer} />
            <td>Radius:</td>
            <td className={styles.detailsGrenadeValue}>
              {props.grenade.radius}
            </td>
          </tr>
        </tbody>
      </table>
      <p>{props.grenade.description}</p>
    </div>
  );
}
