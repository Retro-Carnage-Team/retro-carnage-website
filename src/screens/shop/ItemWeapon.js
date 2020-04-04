import React from 'react';
import './ItemWeapon.css';

export default class ItemWeapon extends React.Component {

  render() {
    return (
      <div className="item-weapon">   
        <img src={ this.props.weapon.image } alt=""></img>
      </div>
    );
  }

}