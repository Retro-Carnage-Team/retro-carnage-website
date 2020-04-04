import InventoryController from './InventoryController';

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