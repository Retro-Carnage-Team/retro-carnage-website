import Ammunition from './Ammunition';
import Grenades from './Grenades';
import Weapons from './Weapons';
import ChangeListener from './ChangeListener';

export const PROP_AMMUNITION = 'ammunition';
export const PROP_CASH = 'cash';
export const PROP_GRENADES = 'grenades';
export const PROP_LIVES = 'lives';
export const PROP_SCORE = 'score';
export const PROP_SELECTED_WEAPON = 'selected-weapon';
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

function getNamesOfWeaponsAndGrenadesInInventory(weapons, grenades) {
  const w = Weapons.filter((w) => weapons[w.name]).map((w) => w.name);
  const g = Grenades.filter((g) => grenades[g.name] > 0).map((g) => g.name);
  return w.concat(g);
}

export class Player {

  constructor(index) {
    this.changeListeners = [];
    this.index = index;
    this.name = `Player ${index +1}`;
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

  isAlive = () => {
    return this.lives > 0;
  }

  setLives = (value) => {
    this.lives = value;
    this.changeListeners.forEach((listener) => listener.call(value, PROP_LIVES));
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

  getSelectedWeapon = () => {
    const weapon = Weapons.find((w) => w.name === this.selectedWeaponName);
    return weapon ? weapon : Grenades.find((g) => g.name === this.selectedWeaponName);
  }

  getAmmunitionCountForSelectedWeapon = () => {
    const weapon = Weapons.find((w) => w.name === this.selectedWeaponName);
    return weapon ? this.getAmmunitionCount(weapon.ammo) : this.getGrenadeCount(this.selectedWeaponName);
  }

  addChangeListener = (listener) => {
    if(!(listener instanceof ChangeListener)) {                                                                         // I made that mistake too often
      throw new Error('ChangeListeners have to be ChangeListener objects - not callbacks!');
    }
    this.changeListeners.push(listener);
  }

  removeChangeListener = (listener) => {
    const index = this.changeListeners.indexOf(listener);
    if (index > -1) {
      this.changeListeners.splice(index, 1);
    }
  }

  selectFirstWeapon = () => {
    const items = getNamesOfWeaponsAndGrenadesInInventory(this.weapons, this.grenades);
    this.selectedWeaponName = items[0];
    this.changeListeners.forEach((listener) => listener.call(this.selectedWeaponName, PROP_SELECTED_WEAPON));
  }

  selectNextWeapon = () => {
    const items = getNamesOfWeaponsAndGrenadesInInventory(this.weapons, this.grenades);
    const idx = items.findIndex((i) => i === this.selectedWeaponName);
    this.selectedWeaponName = ((-1 < idx) && (idx +1 < items.length)) ? items[idx +1] : items[0];
    this.changeListeners.forEach((listener) => listener.call(this.selectedWeaponName, PROP_SELECTED_WEAPON));
  }

  selectPreviousWeapon = () => {
    const items = getNamesOfWeaponsAndGrenadesInInventory(this.weapons, this.grenades);
    const idx = items.findIndex((i) => i === this.selectedWeaponName);
    this.selectedWeaponName = ((-1 < idx) && (idx -1 >= 0)) ? items[idx -1] : items[items.length -1];
    this.changeListeners.forEach((listener) => listener.call(this.selectedWeaponName, PROP_SELECTED_WEAPON));
  }

  reset = () => {
    this.cash = 5000;
    this.lives = 3;
    this.score = 0;
    this.selectedWeaponName = null;

    this.ammunition = buildAmmunitionMap();
    this.grenades = buildGrenadeMap();
    this.weapons = buildWeaponMap();
  }

}

const playerOne = new Player(0);
const playerTwo = new Player(1);
export default [playerOne, playerTwo];
