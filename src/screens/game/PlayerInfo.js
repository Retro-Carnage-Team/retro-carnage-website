import React from 'react';
import './PlayerInfo.css';

export default class PlayerInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player-info">
        <img 
          alt={`Portrait of player ${this.props.player}`} 
          className="player-portrait" 
          src={`images/backgrounds/portrait-player-${this.props.player}.jpg`} />
        
        <div className="score-container">
          <h2>3100</h2>
        </div>

        <div className="weapon-container">
          <img 
            alt={`Selected weapon of player ${this.props.player}`} 
            className="selected-weapon" 
            src="images/tiles/weapons/G36-r.png" />
          <h2>2154</h2>
        </div>

        <div className="lives-container">
          <img src="images/backgrounds/life-player-1.png" alt="" />
          <img src="images/backgrounds/life-player-1.png" alt="" />
          <img src="images/backgrounds/life-player-1.png" alt="" />
          <img src="images/backgrounds/life-player-1.png" alt="" />
        </div>
      </div>
    );
  }

}