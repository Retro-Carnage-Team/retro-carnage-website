import React from 'react';
import './ItemAmmunition.css';

export default class ItemAmmunition extends React.Component {
  
  render() {
    return (
      <div className="item-ammunition" onMouseEnter={ this.handleMouseEnter }>
        <img className="item-ammunition-image" src={ this.props.ammunition.image } alt=""></img>
      </div>
    );
  }

  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.ammunition);
  }

}