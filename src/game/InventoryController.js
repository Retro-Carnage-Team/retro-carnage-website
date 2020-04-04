import Ammunition from './Ammunition';
import Grenades from './Grenades';
import Weapons from './Weapons';

class InventoryController {

    constructor() {
        this.reset();
    }

    reset = () => {
        this.cash = 5000;
        this.weapons = this.buildWeaponMap();
    }

    buildWeaponMap = () => {
        let result = { };
        Weapons.forEach(w => result[w.name] = false);
        return result;
    }

    isWeaponInInventory = (weaponName) => {
        return this.weapons[weaponName];
    }

    isWeaponProcurable = (weaponName) => {
        return !this.weapons[weaponName] && (this.cash >= Weapons.find(w => w.name === weaponName).price);
    }

    buyWeapon = (weaponName) => {
        this.weapons[weaponName] = true;
        this.cash = this.cash - Weapons.find(w => w.name === weaponName).price;
    }

}

const inventoryControllerInstance = new InventoryController();
export default inventoryControllerInstance;