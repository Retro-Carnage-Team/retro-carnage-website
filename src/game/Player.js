import Ammunition from './Ammunition';
import Grenades from './Grenades';
import Weapons from './Weapons';
import ChangeListener from './ChangeListener';

export const PROP_AMMUNITION = 'ammunition';
export const PROP_CASH = 'cash';
export const PROP_GRENADES = 'grenades';
export const PROP_LIFES = 'lifes';
export const PROP_SCORE = 'score';
export const PROP_WEAPONS = 'weapons';

function buildAmmunitionMap() {
  let result = { };
  Ammunition.forEach((a) => result[a.name] = 0);
  return result;
}

function buildGrenadeMap() {
  let result = { };
  Grenades.forEach((g) => result[g.name] = 0);
  return result;
}

function buildWeaponMap() {
  let result = { };
  Weapons.forEach((w) => result[w.name] = false);
  return result;
}

class Player {

  constructor() {
    this.changeListeners = [];
    this.reset();
  }

  getAmmunitionCount = (ammunitionName) => {
    return this.ammunition[ammunitionName];
  }

  setAmmunitionCount = (ammunitionName, value) => {
    this.ammunition[ammunitionName] = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_AMMUNITION));
  }

  setCash = (value) => {
    this.cash = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_CASH));
  }

  getGrenadeCount = (grenadeName) => {
    return this.grenades[grenadeName];
  }

  setGrenadeCount = (grenadeName, value) => {
    this.grenades[grenadeName] = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_GRENADES));
  }

  setLifes = (value) => {
    this.lifes = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_LIFES));
  }

  setScore = (value) => {
    this.score = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_SCORE));
  }

  isWeaponInInventory = (weaponName) => {
    return this.weapons[weaponName];
  }

  setWeaponInInventory = (weaponName, value) => {
    this.weapons[weaponName] = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_WEAPONS));
  }

  addChangeListener = (listener) => {
    if(!(listener instanceof ChangeListener)) {                                                                         // I did that mistake too often
      throw new Error('ChangeListeners have to be ChangeListener objects - not callbacks!');
    }
    this.changeListeners.push(listener);
  }

  removeChangeListener = (listener) => {
    const index = this.changeListeners.indexOf(listener);
    if (index > -1)
      this.changeListeners.splice(index, 1);
  }

  reset = () => {
    this.cash = 5000;
    this.lifes = 3;
    this.score = 0;

    this.ammunition = buildAmmunitionMap();
    this.grenades = buildGrenadeMap();
    this.weapons = buildWeaponMap();
  }

}

const playerOne = new Player();
const playerTwo = new Player();
export default [playerOne, playerTwo];