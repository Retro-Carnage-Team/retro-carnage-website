export default class ChangeListener {
  
  constructor(callback, propertyName) {
    this.callback = callback;
    this.propertyName = propertyName;
  }

  handlesProperty = (propertyName) => {
    return (!this.propertyName) || (this.propertyName === propertyName);
  }

  call = (newValue, changedProperty) => {
    if(this.handlesProperty(changedProperty)) {
      this.callback(newValue, changedProperty);
    }
  }

}