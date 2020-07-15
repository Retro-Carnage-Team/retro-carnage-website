export default class ChangeListener<T> {
  private readonly callback: (value: T, property: string) => void;
  private readonly propertyNames: string[];

  constructor(
    callback: (value: T, property: string) => void,
    ...propertyNames: string[]
  ) {
    this.callback = callback;
    this.propertyNames = propertyNames;
  }

  handlesProperty = (propertyName: string) => {
    return (
      0 === this.propertyNames.length ||
      -1 !== this.propertyNames.indexOf(propertyName)
    );
  };

  call = (newValue: T, changedProperty: string) => {
    if (this.handlesProperty(changedProperty)) {
      this.callback(newValue, changedProperty);
    }
  };
}
