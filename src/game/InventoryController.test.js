import InventoryController from './InventoryController';
import Ammunition from './Ammunition';
import Grenades from './Grenades';

test('Initial ammo count is zero and increases by package size of ammo type', () => {
    InventoryController.reset();
    const ammo = Ammunition[0];
    expect(InventoryController.getAmmunitionCount(ammo.name)).toBe(0);
    InventoryController.buyAmmunition(ammo.name);
    expect(InventoryController.getAmmunitionCount(ammo.name)).toBe(ammo.packageSize);
});


test('Ammo count does not grow larger than maxCount', () => {
    InventoryController.reset();
    const ammo = Ammunition[0];
    InventoryController.ammunition[ammo.name] = ammo.maxCount - 1;
    expect(InventoryController.isAmmunitionProcurable(ammo.name)).toBeTruthy();
    InventoryController.buyAmmunition(ammo.name);
    expect(InventoryController.getAmmunitionCount(ammo.name)).toBe(ammo.maxCount);
    expect(InventoryController.isAmmunitionProcurable(ammo.name)).toBeFalsy();
});


test('Buying ammo should decrease the amount cash available', () => {
    InventoryController.reset();
    const ammo = Ammunition[0];
    const oldCash = InventoryController.cash;
    InventoryController.buyAmmunition(ammo.name);
    expect(InventoryController.cash).toBe(oldCash - ammo.price);
});


test('Initial grenade count is zero and increases by 5', () => {
    InventoryController.reset();
    const grenade = Grenades[0];
    expect(InventoryController.getGrenadeCount(grenade.name)).toBe(0);
    InventoryController.buyGrenade(grenade.name);
    expect(InventoryController.getGrenadeCount(grenade.name)).toBe(5);
});


test('Buying a grenade should decrease the amount cash available', () => {
    InventoryController.reset();
    const grenade = Grenades[0];
    const oldCash = InventoryController.cash;
    InventoryController.buyGrenade(grenade.name);
    expect(InventoryController.cash).toBe(oldCash - grenade.price);
});


test('Weapons should be procurable when user has cash and did not buy it before', () => {
    InventoryController.reset();
    const weapon = "P7";
    expect(InventoryController.isWeaponInInventory(weapon)).toBeFalsy();
    expect(InventoryController.isWeaponProcurable(weapon)).toBeTruthy();
    InventoryController.buyWeapon(weapon);
    expect(InventoryController.isWeaponProcurable(weapon)).toBeFalsy();
});


test('Buying a weapons should decrease the amount cash available', () => {
    InventoryController.reset();
    const weapon = "P7";
    const oldCash = InventoryController.cash;
    InventoryController.buyWeapon(weapon);
    expect(InventoryController.cash).toBeLessThan(oldCash);
});


test('Change listeners should get informed every time a change happened', () => {
    let callCounter = 0;
    function callback() {
        callCounter += 1;
    }

    InventoryController.reset();    
    InventoryController.addChangeListener(callback);
    InventoryController.buyWeapon("P7");
    expect(callCounter).toBe(1);

    InventoryController.removeChangeListener(callback);
    InventoryController.buyWeapon("P7");
    expect(callCounter).toBe(1);
});


test('Removing listeners from controller should work', () => {
    let called = false;
    function callback() {
        called = true;
    }

    InventoryController.reset();
    InventoryController.addChangeListener(callback);
    InventoryController.removeChangeListener(callback);
    InventoryController.buyWeapon("P7");
    expect(called).toBeFalsy();
});