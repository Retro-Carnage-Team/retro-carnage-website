import ChangeListener from './ChangeListener';

test('ChangeListener should handle matching property', () => {
  const propertyName = 'name';
  const listener = new ChangeListener((value) => { console.log(value); }, propertyName);
  expect(listener.handlesProperty(propertyName)).toBeTruthy();
});

test('ChangeListener should not handle other properties', () => {
  const propertyName = 'name';
  const listener = new ChangeListener(() => { }, propertyName);
  expect(listener.handlesProperty(`not-${propertyName}`)).toBeFalsy();
});

test('ChangeListener should handle all properties when not specified', () => {
  const propertyName = 'name';
  const listener = new ChangeListener(() => { });
  expect(listener.handlesProperty(propertyName)).toBeTruthy();
  expect(listener.handlesProperty(`not-${propertyName}`)).toBeTruthy();
});

test('ChangeListener should call the specified callback correctly', () => {
  const propertyNameValue = 'property-name';
  const newValue = 42;
  let called = false;

  const callback = (value, propertyName) => { 
    called = true;
    expect(value).toBe(newValue);
    expect(propertyName).toBe(propertyNameValue);
  };
  
  const filteredListener = new ChangeListener(callback, propertyNameValue);
  filteredListener.call(newValue, propertyNameValue);
  expect(called).toBeTruthy();

  called = false;
  
  const unfilteredListener = new ChangeListener(callback);
  unfilteredListener.call(newValue, propertyNameValue);
  expect(called).toBeTruthy();
});
