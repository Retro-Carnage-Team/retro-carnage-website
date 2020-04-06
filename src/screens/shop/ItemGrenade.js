import React from 'react';
import './ItemGrenade.css';
import InventoryController from '../../game/InventoryController';

export default class ItemGrenade extends React.Component {

  render() {
    return (
      <div 
        className="item-grenade" 
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }>
        <img className="item-grenade-image" src={ this.props.grenade.image } alt=""></img>
      </div>
    );
  }

  handleClick = () => {
    InventoryController.buyGrenade(this.props.grenade.name);
  }

  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.grenade);
  }

  handleMouseLeave = () => {
    this.props.onMouseLeave();
  }

}