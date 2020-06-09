import InventoryController from './InventoryController';
import Ammunition from './Ammunition';
import Grenades from './Grenades';
import Players from './Player';

test('Initial ammo count is zero and increases by package size of ammo type', () => {
  Players[0].reset();
  const ammo = Ammunition[0];
  expect(InventoryController.getAmmunitionCount(0, ammo.name)).toBe(0);
  InventoryController.buyAmmunition(0, ammo.name);
  expect(InventoryController.getAmmunitionCount(0, ammo.name)).toBe(ammo.packageSize);
});


test('Ammo count does not grow larger than maxCount', () => {
  const ammo = Ammunition[0];
  const player = Players[0];
  player.reset();  
  player.setAmmunitionCount(ammo.name, ammo.maxCount - 1);
  expect(InventoryController.isAmmunitionProcurable(0, ammo.name)).toBeTruthy();
  InventoryController.buyAmmunition(0, ammo.name);
  expect(InventoryController.getAmmunitionCount(0, ammo.name)).toBe(ammo.maxCount);
  expect(InventoryController.isAmmunitionProcurable(0, ammo.name)).toBeFalsy();
});


test('Buying ammo should decrease the amount cash available', () => {
  const player = Players[0];
  player.reset();
  const ammo = Ammunition[0];
  const oldCash = player.cash;
  InventoryController.buyAmmunition(0, ammo.name);
  expect(player.cash).toBe(oldCash - ammo.price);
});


test('Initial grenade count is zero and increases by 5', () => {
  Players[0].reset();
  const grenade = Grenades[0];
  expect(InventoryController.getGrenadeCount(0, grenade.name)).toBe(0);
  InventoryController.buyGrenade(0, grenade.name);
  expect(InventoryController.getGrenadeCount(0, grenade.name)).toBe(5);
});


test('Buying a grenade should decrease the amount cash available', () => {
  const player = Players[0];
  player.reset();
  const grenade = Grenades[0];
  const oldCash = player.cash;
  InventoryController.buyGrenade(0, grenade.name);
  expect(player.cash).toBe(oldCash - grenade.price);
});


test('Weapons should be procurable when user has cash and did not buy it before', () => {
  Players[0].reset();
  const weapon = 'P7';
  expect(InventoryController.isWeaponInInventory(0, weapon)).toBeFalsy();
  expect(InventoryController.isWeaponProcurable(0, weapon)).toBeTruthy();
  InventoryController.buyWeapon(0, weapon);
  expect(InventoryController.isWeaponProcurable(0, weapon)).toBeFalsy();
});


test('Buying a weapons should decrease the amount cash available', () => {
  const player = Players[0];
  player.reset();
  const weapon = 'P7';
  const oldCash = player.cash;
  InventoryController.buyWeapon(0, weapon);
  expect(player.cash).toBeLessThan(oldCash);
});

test('Removing ammunition should change amount of amount > 0', () => {
  const player = Players[0];
  player.reset();
  const grenade = Grenades[0];
  InventoryController.buyGrenade(0, grenade.name);
  const count = player.getGrenadeCount(grenade.name);
  expect(count).toBeGreaterThan(0);
  player.selectedWeaponName = grenade.name;
  const result = InventoryController.removeAmmunition(0);
  expect(result).toBeTruthy();
  expect(player.getGrenadeCount(grenade.name)).toBe(count -1);
});