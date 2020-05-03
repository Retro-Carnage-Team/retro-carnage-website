import Ammunition from './Ammunition';
import Grenades from './Grenades';
import Weapons from './Weapons';
import Players from './Player';
import SoundBoard, { FX_CASH, FX_ERROR } from './SoundBoard';

class InventoryController {

  getAmmunitionCount = (playerIdx, ammunitionName) => {
    return Players[playerIdx].getAmmunitionCount(ammunitionName);
  }

  isAmmunitionProcurable = (playerIdx, ammunitionName) => {
    const ammoType = Ammunition.find((a) => a.name === ammunitionName);
    return (this.getAmmunitionCount(playerIdx, ammunitionName) < ammoType.maxCount) 
            && (Players[playerIdx].cash >= ammoType.price);
  }

  buyAmmunition = (playerIdx, ammunitionName) => {
    if(this.isAmmunitionProcurable(playerIdx, ammunitionName)) {
      const ammoType = Ammunition.find((a) => a.name === ammunitionName);
      const player = Players[playerIdx];
      const increasedCount = player.getAmmunitionCount(ammunitionName) + ammoType.packageSize;
      player.setAmmunitionCount(ammunitionName, Math.min(increasedCount, ammoType.maxCount));
      player.setCash(player.cash - ammoType.price);
      SoundBoard.play(FX_CASH);
    } else {
      SoundBoard.play(FX_ERROR);
    }
  }

  getGrenadeCount = (playerIdx, grenadeName) => {
    return Players[playerIdx].getGrenadeCount(grenadeName);
  }

  isGrenadeProcurable = (playerIdx, grenadeName) => {
    const grenadeType = Grenades.find((a) => a.name === grenadeName);
    return (this.getGrenadeCount(playerIdx, grenadeName) < grenadeType.maxCount) 
            && (Players[playerIdx].cash >= grenadeType.price);
  }

  buyGrenade = (playerIdx, grenadeName) => {
    if(this.isGrenadeProcurable(playerIdx, grenadeName)) {
      const grenade = Grenades.find((g) => g.name === grenadeName);
      const player = Players[playerIdx];
      const increasedCount = this.getGrenadeCount(playerIdx, grenadeName) + grenade.packageSize;
      player.setGrenadeCount(grenadeName, Math.min(increasedCount, grenade.maxCount));
      player.setCash(player.cash - grenade.price);
      SoundBoard.play(FX_CASH);
    } else {
      SoundBoard.play(FX_ERROR);
    } 
  }

  isWeaponInInventory = (playerIdx, weaponName) => {
    return Players[playerIdx].isWeaponInInventory(weaponName);
  }

  isWeaponProcurable = (playerIdx, weaponName) => {
    const player = Players[playerIdx];
    const weapon = Weapons.find((w) => w.name === weaponName);
    return !this.isWeaponInInventory(playerIdx, weaponName) && (player.cash >= weapon.price);
  }

  buyWeapon = (playerIdx, weaponName) => {
    if(this.isWeaponProcurable(playerIdx, weaponName)) {
      const player = Players[playerIdx];
      const weapon = Weapons.find((w) => w.name === weaponName);
      player.setWeaponInInventory(weaponName, true);
      player.setCash(player.cash - weapon.price);
      SoundBoard.play(FX_CASH);
    } else {
      SoundBoard.play(FX_ERROR);
    } 
  }

}

const inventoryControllerInstance = new InventoryController();
export default inventoryControllerInstance;
