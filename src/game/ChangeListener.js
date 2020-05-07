export default class ChangeListener {
  
  constructor(callback, ...propertyNames) {
    this.callback = callback;
    this.propertyNames = propertyNames;
  }

  handlesProperty = (propertyName) => {
    return (0 === this.propertyNames.length) || (-1 !== this.propertyNames.indexOf(propertyName));
  }

  call = (newValue, changedProperty) => {
    if(this.handlesProperty(changedProperty)) {
      this.callback(newValue, changedProperty);
    }
  }

}