import React from "react";
import styles from "./DetailAmmunition.module.css";

export default function DetailAmmunition(props) {
  return (
    <div className={styles.detailsAmmunitionInner}>
      <h2>{props.ammunition.name}</h2>
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
