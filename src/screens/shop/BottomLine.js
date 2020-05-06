import React from 'react';
import './BottomLine.css';

export default class BottomLine extends React.Component {

  render() {
    return (
      <div className="bottom-line">
        <div className="cost-label">Cost: </div>
        <div className="cost-value">${ this.getCostForSelectedItem() }</div>
        <div className="credit-label">Credit: </div>
        <div className="credit-value">${ this.props.player.cash }</div>
        <div className="exit-label" onClick={ this.handleExitClicked }>Exit</div>
      </div>
    );
  }

  getCostForSelectedItem = () => {
    let result = 0;
    if(null !== this.props.selectedAmmunition) {
      result = this.props.selectedAmmunition.price;
    } else if(null !== this.props.selectedGrenade) {
      result = this.props.selectedGrenade.price;            
    } else if(null !== this.props.selectedWeapon) {        
      result = this.props.selectedWeapon.price;
    }
    return result;
  }

  handleExitClicked = () => {
    this.props.onExit();
  }

}