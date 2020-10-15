import { Ammunitions } from "./Ammunition";
import { Grenade, Grenades } from "./Grenades";
import { Weapon, Weapons } from "./Weapons";
import ChangeListener from "./ChangeListener";

export enum PlayerProperties {
  Ammunition = "ammunition",
  Cash = "cash",
  Grenades = "grenades",
  Lives = "lives",
  Score = "score",
  SelectedWeapon = "selected-weapon",
  Weapons = "weapons",
}

interface AmmunitionCounter {
  ammoName: string;
  count: number;
}

interface WeaponOwnership {
  weaponName: string;
  owned: boolean;
}

export class Player {
  public readonly index: number;
  public readonly name: string;
  public cash: number;
  public lives: number;
  public score: number;
  public selectedWeaponName: string | null;

  private changeListeners: ChangeListener<any>[];
  private ammunition: AmmunitionCounter[];
  private grenades: AmmunitionCounter[];
  private weapons: WeaponOwnership[];

  public constructor(index: number) {
    this.changeListeners = [];
    this.index = index;
    this.name = `Player ${index + 1}`;
    this.cash = 5000;
    this.lives = 3;
    this.score = 0;
    this.selectedWeaponName = null;
    this.ammunition = this.buildAmmunitionMap();
    this.grenades = this.buildGrenadeMap();
    this.weapons = this.buildWeaponMap();
  }

  getAmmunitionCount = (ammunitionName: string): number => {
    const ammoCounter = this.ammunition.find(
      (ammoCounter) => ammoCounter.ammoName === ammunitionName
    );
    return ammoCounter ? ammoCounter.count : 0;
  };

  setAmmunitionCount = (ammunitionName: string, value: number) => {
    const ammoCounter = this.ammunition.find(
      (ammoCounter) => ammoCounter.ammoName === ammunitionName
    );
    if (ammoCounter) {
      ammoCounter.count = value;
      this.changeListeners.forEach((listener) =>
        listener.call(value, PlayerProperties.Ammunition)
      );
    }
  };

  setCash = (value: number) => {
    this.cash = value;
    this.changeListeners.forEach((listener) =>
      listener.call(value, PlayerProperties.Cash)
    );
  };

  getGrenadeCount = (grenadeName: string): number => {
    const grenadeCounter = this.grenades.find(
      (grenadeCounter) => grenadeCounter.ammoName === grenadeName
    );
    return grenadeCounter ? grenadeCounter.count : 0;
  };

  setGrenadeCount = (grenadeName: string, value: number) => {
    const grenadeCounter = this.grenades.find(
      (grenadeCounter) => grenadeCounter.ammoName === grenadeName
    );
    if (grenadeCounter) {
      grenadeCounter.count = value;
      this.changeListeners.forEach((listener) =>
        listener.call(value, PlayerProperties.Grenades)
      );
    }
  };

  isAlive = (): boolean => {
    return this.lives > 0;
  };

  setLives = (value: number) => {
    this.lives = value;
    this.changeListeners.forEach((listener) =>
      listener.call(value, PlayerProperties.Lives)
    );
  };

  setScore = (value: number) => {
    this.score = value;
    this.changeListeners.forEach((listener) =>
      listener.call(value, PlayerProperties.Score)
    );
  };

  isWeaponInInventory = (weaponName: string): boolean => {
    const ownership = this.weapons.find(
      (weaponOwnership) => weaponOwnership.weaponName === weaponName
    );
    return ownership ? ownership.owned : false;
  };

  setWeaponInInventory = (weaponName: string, value: boolean) => {
    const ownership = this.weapons.find(
      (weaponOwnership) => weaponOwnership.weaponName === weaponName
    );
    if (ownership) {
      ownership.owned = value;
      this.changeListeners.forEach((listener) =>
        listener.call(value, PlayerProperties.Weapons)
      );
    }
  };

  getSelectedWeapon = (): Weapon | Grenade | undefined => {
    const weapon = Weapons.find((w) => w.name === this.selectedWeaponName);
    return weapon
      ? weapon
      : Grenades.find((g) => g.name === this.selectedWeaponName);
  };

  isGrenadeSelected = (): boolean => {
    const selected = this.getSelectedWeapon();
    return undefined !== selected && "explosive" in selected;
  };

  isRpgSelected = (): boolean => {
    const selected = this.getSelectedWeapon();
    if (undefined !== selected && "ammo" in selected) {
      const weapon = selected as Weapon;
      return (
        "89 mm" === weapon.ammo ||
        "60 mm" === weapon.ammo ||
        "110 mm" === weapon.ammo
      );
    }
    return false;
  };

  isPistolSelected = (): boolean => {
    const selected = this.getSelectedWeapon();
    if (undefined !== selected && "ammo" in selected) {
      const weapon = selected as Weapon;
      return "P7" === weapon.name || "P210" === weapon.name;
    }
    return false;
  };

  isAutomaticWeaponSelected = (): boolean => {
    const selected = this.getSelectedWeapon();
    return (
      undefined !== selected &&
      "bulletInterval" in selected &&
      "number" === typeof selected.bulletInterval
    );
  };

  getAmmunitionCountForSelectedWeapon = (): number => {
    if (null === this.selectedWeaponName) {
      return 0;
    } else {
      const weapon = Weapons.find((w) => w.name === this.selectedWeaponName);
      return weapon
        ? this.getAmmunitionCount(weapon.ammo)
        : this.getGrenadeCount(this.selectedWeaponName);
    }
  };

  addChangeListener = (listener: ChangeListener<any>) => {
    this.changeListeners.push(listener);
  };

  removeChangeListener = (listener: ChangeListener<any>) => {
    const index = this.changeListeners.indexOf(listener);
    if (index > -1) {
      this.changeListeners.splice(index, 1);
    }
  };

  selectFirstWeapon = () => {
    const items = this.getNamesOfWeaponsAndGrenadesInInventory();
    this.selectedWeaponName = items[0];
    this.changeListeners.forEach((listener) =>
      listener.call(this.selectedWeaponName, PlayerProperties.SelectedWeapon)
    );
  };

  selectNextWeapon = () => {
    const items = this.getNamesOfWeaponsAndGrenadesInInventory();
    const idx = items.findIndex((i) => i === this.selectedWeaponName);
    this.selectedWeaponName =
      -1 < idx && idx + 1 < items.length ? items[idx + 1] : items[0];
    this.changeListeners.forEach((listener) =>
      listener.call(this.selectedWeaponName, PlayerProperties.SelectedWeapon)
    );
  };

  selectPreviousWeapon = () => {
    const items = this.getNamesOfWeaponsAndGrenadesInInventory();
    const idx = items.findIndex((i) => i === this.selectedWeaponName);
    this.selectedWeaponName =
      -1 < idx && idx - 1 >= 0 ? items[idx - 1] : items[items.length - 1];
    this.changeListeners.forEach((listener) =>
      listener.call(this.selectedWeaponName, PlayerProperties.SelectedWeapon)
    );
  };

  reset = () => {
    this.cash = 5000;
    this.lives = 3;
    this.score = 0;
    this.selectedWeaponName = null;

    this.ammunition = this.buildAmmunitionMap();
    this.grenades = this.buildGrenadeMap();
    this.weapons = this.buildWeaponMap();
  };

  private buildAmmunitionMap = (): AmmunitionCounter[] => {
    return Ammunitions.map((a) => ({ ammoName: a.name, count: 0 }));
  };

  private buildGrenadeMap = (): AmmunitionCounter[] => {
    return Grenades.map((g) => ({ ammoName: g.name, count: 0 }));
  };

  private buildWeaponMap = (): WeaponOwnership[] => {
    return Weapons.map((w) => ({ weaponName: w.name, owned: false }));
  };

  private getNamesOfWeaponsAndGrenadesInInventory(): string[] {
    const weaponNames = this.weapons
      .filter((wo) => wo.owned)
      .map((wo) => wo.weaponName);
    const grenadeNames = this.grenades
      .filter((ac) => ac.count > 0)
      .map((ac) => ac.ammoName);
    return weaponNames.concat(grenadeNames);
  }
}

const playerOne = new Player(0);
const playerTwo = new Player(1);
export const Players = [playerOne, playerTwo];
