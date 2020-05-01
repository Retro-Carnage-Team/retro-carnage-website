import React from 'react';
import './PlayerInfo.css';

export default class PlayerInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`player-info-${this.props.player}`}>
        <img 
          alt={`Portrait of player ${this.props.player}`} 
          id="player-portrait" 
          src={`images/backgrounds/portrait-player-${this.props.player}.jpg`} />
        
        <h2 className="score">3100</h2>
        <div className="weapon-container">
          
        </div>
        <div className="ammunition-container">
          <span>2154</span>
        </div>
        <div className="lives-container">
          <span>5</span>
        </div>
      </div>
    );
  }

}