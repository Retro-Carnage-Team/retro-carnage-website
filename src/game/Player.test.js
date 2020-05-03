import ChangeListener from './ChangeListener';
import Players, { PROP_WEAPONS } from './Player';

test('Change listeners should get informed every time a change happened', () => {
  let callCounter = 0;
  let value = null;
  let name = null;

  function callback(v, n) {
    value = v;
    name = n;
    callCounter += 1;
  }
  const changeListener = new ChangeListener(callback);

  const player = Players[0];
  player.reset();
  player.addChangeListener(changeListener);
  player.setWeaponInInventory('P7', true);
  expect(callCounter).toBe(1);
  expect(value).toBeTruthy();
  expect(name).toBe(PROP_WEAPONS);

  player.removeChangeListener(changeListener);
  player.setWeaponInInventory('P7', false);
  expect(callCounter).toBe(1);
});
