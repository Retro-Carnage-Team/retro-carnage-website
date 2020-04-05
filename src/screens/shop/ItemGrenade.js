import React from 'react';
import './ItemGrenade.css';

export default class ItemGrenade extends React.Component {

  render() {
    return (
      <div className="item-grenade" onMouseEnter={ this.handleMouseEnter }>
        <img className="item-grenade-image" src={ this.props.grenade.image } alt=""></img>
      </div>
    );
  }

  handleMouseEnter = () => {
    this.props.onMouseEnter(this.props.grenade);
  }

}