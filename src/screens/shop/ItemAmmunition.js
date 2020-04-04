import React from 'react';
import './ItemAmmunition.css';

export default class ItemAmmunition extends React.Component {
  
  render() {
    return (
      <div className="item-ammunition">
        <img className="item-ammunition-image" src={ this.props.ammunition.image } alt=""></img>
      </div>
    );
  }

}