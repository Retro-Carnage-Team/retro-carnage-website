import React from 'react';
import classNames from 'classnames';
import './ItemWeapon.css';
import InventoryController from '../../game/InventoryController';

export default class ItemWeapon extends React.Component {

  render() {
    var imgClasses = classNames({
      'item-weapon-image': true,
      'compatible': (null !== this.props.selectedAmmunition) && 
                    (this.props.selectedAmmunition.name === this.props.weapon.ammo)
    });

    return (
      <div 
        className="item-weapon" 
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }>
        <img className={ imgClasses } src={ this.props.weapon.image } alt=""></img>
      </div>
    );
  }

  handleClick = () => {
    InventoryController.buyWeapon(this.props.weapon.name);
  }

  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.weapon);
  }

  handleMouseLeave = () => {
    this.props.onMouseLeave();
  }

}