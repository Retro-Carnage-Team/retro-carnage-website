import React from 'react';
import classNames from 'classnames';
import './ItemWeapon.css';
import InventoryController from '../../game/InventoryController';

export default class ItemWeapon extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mouseOver: false };
  }

  render() {
    const compatible = (null !== this.props.selectedAmmunition) && 
                       (this.props.selectedAmmunition.name === this.props.weapon.ammo);
    const imgClasses = compatible ? 'compatible' : null;
    
    var svgClasses = classNames({
      compatible,
      'purchased': InventoryController.isWeaponInInventory(this.props.player, this.props.weapon.name)
    });

    return (
      <div 
        className="item-weapon" 
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }>
        <img className={ imgClasses } src={ this.props.weapon.image } alt=""></img>
        <svg className={ svgClasses } viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
      </div>
    );
  }

  handleClick = () => {
    InventoryController.buyWeapon(this.props.player, this.props.weapon.name);
  }

  handleMouseEnter = () => {
    this.setState({ mouseOver: true });
    this.props.onMouseEnter(this.props.weapon);
  }

  handleMouseLeave = () => {
    this.setState({ mouseOver: true });
    this.props.onMouseLeave();
  }

}
