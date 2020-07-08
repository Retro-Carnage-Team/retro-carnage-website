import {Ammunitions} from './Ammunition';
import {Grenades} from './Grenades';
import {Weapons} from './Weapons';
import {Players} from './Player';
import SoundBoard, {FX_CASH, FX_ERROR, FX_OUT_OF_AMMO} from './SoundBoard';

class InventoryController {

  getAmmunitionCount = (playerIdx: number, ammunitionName: string): number => {
    return Players[playerIdx].getAmmunitionCount(ammunitionName);
  }

  isAmmunitionProcurable = (playerIdx: number, ammunitionName: string): boolean => {
    const ammoType = Ammunitions.find((a) => a.name === ammunitionName);
    if(ammoType) {
      return (this.getAmmunitionCount(playerIdx, ammunitionName) < ammoType.maxCount)
             && (Players[playerIdx].cash >= ammoType.price);
    }
    return false;
  }

  buyAmmunition = (playerIdx: number, ammunitionName: string) => {
    if(this.isAmmunitionProcurable(playerIdx, ammunitionName)) {
      const ammoType = Ammunitions.find((a) => a.name === ammunitionName);
      if(ammoType) {
        const player = Players[playerIdx];
        const increasedCount = player.getAmmunitionCount(ammunitionName) + ammoType.packageSize;
        player.setAmmunitionCount(ammunitionName, Math.min(increasedCount, ammoType.maxCount));
        player.setCash(player.cash - ammoType.price);
        SoundBoard.play(FX_CASH);
      }
    } else {
      SoundBoard.play(FX_ERROR);
    }
  }

  /*
    Removes one piece of ammunition for the currently selected weapon.
    Returns whether or not that was possible
   */
  removeAmmunition = (playerIdx: number): boolean => {
    const player = Players[playerIdx];
    const selectedWeapon = player.getSelectedWeapon();
    if(selectedWeapon) {
      if ((null !== player.selectedWeaponName) && player.isGrenadeSelected()) {
        const grenadeCount = player.getGrenadeCount(player.selectedWeaponName);
        if (0 < grenadeCount) {
          player.setGrenadeCount(player.selectedWeaponName, grenadeCount - 1);
          return true;
        }
        // There is no "out of ammo" sound fx for grenades
        return false;
      } else if('ammo' in selectedWeapon) {
        const ammo = selectedWeapon.ammo;
        if (0 < player.getAmmunitionCount(ammo)) {
          // TODO: play sound fx matching the current weapon
          return true;
        } else {
          SoundBoard.play(FX_OUT_OF_AMMO);
          return false;
        }
      }
    }
    return false;
  }

  getGrenadeCount = (playerIdx: number, grenadeName: string): number => {
    return Players[playerIdx].getGrenadeCount(grenadeName);
  }

  isGrenadeProcurable = (playerIdx: number, grenadeName: string): boolean => {
    const grenadeType = Grenades.find((a) => a.name === grenadeName);
    if(grenadeType) {
      return (this.getGrenadeCount(playerIdx, grenadeName) < grenadeType.maxCount)
             && (Players[playerIdx].cash >= grenadeType.price);
    }
    return false;
  }

  buyGrenade = (playerIdx: number, grenadeName: string) => {
    if(this.isGrenadeProcurable(playerIdx, grenadeName)) {
      const grenade = Grenades.find((g) => g.name === grenadeName);
      if(grenade) {
        const player = Players[playerIdx];
        const increasedCount = this.getGrenadeCount(playerIdx, grenadeName) + grenade.packageSize;
        player.setGrenadeCount(grenadeName, Math.min(increasedCount, grenade.maxCount));
        player.setCash(player.cash - grenade.price);
        SoundBoard.play(FX_CASH);
      }
    } else {
      SoundBoard.play(FX_ERROR);
    } 
  }

  isWeaponInInventory = (playerIdx: number, weaponName: string): boolean => {
    return Players[playerIdx].isWeaponInInventory(weaponName);
  }

  isWeaponProcurable = (playerIdx: number, weaponName: string) => {
    const weapon = Weapons.find((w) => w.name === weaponName);
    if(weapon) {
      const player = Players[playerIdx];
      return !this.isWeaponInInventory(playerIdx, weaponName) && (player.cash >= weapon.price);
    }
    return false;
  }

  buyWeapon = (playerIdx: number, weaponName: string) => {
    if(this.isWeaponProcurable(playerIdx, weaponName)) {
      const weapon = Weapons.find((w) => w.name === weaponName);
      if(weapon) {
        const player = Players[playerIdx];
        player.setWeaponInInventory(weaponName, true);
        player.setCash(player.cash - weapon.price);
        SoundBoard.play(FX_CASH);
      }
    } else {
      SoundBoard.play(FX_ERROR);
    } 
  }

}

const inventoryControllerInstance = new InventoryController();
export default inventoryControllerInstance;
