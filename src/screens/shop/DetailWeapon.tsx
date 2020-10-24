import React from "react";
import styles from "./DetailWeapon.module.css";
import { Weapon } from "../../game/Weapons";

export interface DetailWeaponProps {
  weapon: Weapon;
}

export default function DetailWeapon(props: DetailWeaponProps) {
  return (
    <div className={styles.detailsWeaponInner}>
      <table>
        <tbody>
          <tr>
            <td>Price:</td>
            <td className={styles.detailsWeaponValue}>{props.weapon.price}</td>
            <td className={styles.detailsWeaponSpacer} />
            <td>Speed:</td>
            <td className={styles.detailsWeaponValue}>{props.weapon.speed}</td>
          </tr>
          <tr>
            <td>Ammo:</td>
            <td className={styles.detailsWeaponValue}>{props.weapon.ammo}</td>
            <td className={styles.detailsWeaponSpacer} />
            <td>Range:</td>
            <td className={styles.detailsWeaponValue}>
              {props.weapon.range} m
            </td>
          </tr>
          <tr>
            <td>Length:</td>
            <td className={styles.detailsWeaponValue}>{props.weapon.length}</td>
            <td className={styles.detailsWeaponSpacer} />
            <td>Weight:</td>
            <td className={styles.detailsWeaponValue}>{props.weapon.weight}</td>
          </tr>
        </tbody>
      </table>
      <p>{props.weapon.description}</p>
    </div>
  );
}
