import Ammunition from './Ammunition';
import Grenades from './Grenades';
import Weapons from './Weapons';

function buildAmmunitionMap() {
    let result = { };
    Ammunition.forEach(a => result[a.name] = 0);
    return result;
}

function buildGrenadeMap() {
    let result = { };
    Grenades.forEach(g => result[g.name] = 0);
    return result;
}

function buildWeaponMap() {
    let result = { };
    Weapons.forEach(w => result[w.name] = false);
    return result;
}

class InventoryController {

    constructor() {
        this.changeListeners = [];
        this.reset();
    }

    addChangeListener = (callback) => {
        this.changeListeners.push(callback);
    }

    removeChangeListener = (callback) => {
        const index = this.changeListeners.indexOf(callback);
        if (index > -1)
            this.changeListeners.splice(index, 1);        
    }

    callListeners = () => {
        this.changeListeners.forEach(l => l());
    }

    reset = () => {
        this.cash = 5000;
        this.ammunition = buildAmmunitionMap();
        this.grenades = buildGrenadeMap();
        this.weapons = buildWeaponMap();
    }

    getAmmunitionCount = (ammunitionName) => {
        return this.ammunition[ammunitionName];
    }

    isAmmunitionProcurable = (ammunitionName) => {
        const ammoType = Ammunition.find(a => a.name === ammunitionName);
        return (this.ammunition[ammunitionName] < ammoType.maxCount) && (this.cash >= ammoType.price);
    }

    buyAmmunition = (ammunitionName) => {
        const ammoType = Ammunition.find(a => a.name === ammunitionName);
        this.ammunition[ammunitionName] = Math.min(this.ammunition[ammunitionName] + ammoType.packageSize, ammoType.maxCount);
        this.cash = this.cash - ammoType.price;
        this.callListeners();
    }

    getGrenadeCount = (grenadeName) => {
        return this.grenades[grenadeName];
    }

    isGrenadeProcurable = (grenadeName) => {
        const grenadeType = Grenades.find(a => a.name === grenadeName);
        return (this.grenades[grenadeName] < grenadeType.maxCount) && (this.cash >= grenadeType.price);
    }

    buyGrenade = (grenadeName) => {
        this.grenades[grenadeName] = this.grenades[grenadeName] + 1;
        this.cash = this.cash - Grenades.find(g => g.name === grenadeName).price;
        this.callListeners();
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
        this.callListeners();
    }

}

const inventoryControllerInstance = new InventoryController();
export default inventoryControllerInstance;