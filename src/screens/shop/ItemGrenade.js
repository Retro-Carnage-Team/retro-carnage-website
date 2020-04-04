import React from 'react';
import './ItemGrenade.css';

export default class ItemGrenade extends React.Component {

  render() {
    return (
      <div className="item-grenade">
        <img src={ this.props.grenade.image } alt=""></img>
      </div>
    );
  }

}