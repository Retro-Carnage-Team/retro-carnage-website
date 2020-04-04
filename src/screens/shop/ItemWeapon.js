import React from 'react';
import './ItemWeapon.css';

export default class ItemWeapon extends React.Component {

  render() {
    return (
      <div className="item-weapon">   
        <img className="item-weapon-image" src={ this.props.weapon.image } alt=""></img>
      </div>
    );
  }

}