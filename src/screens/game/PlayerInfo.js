import React from 'react';
import './PlayerInfo.css';
import Players from '../../game/Player';
import ChangeListener from "../../game/ChangeListener";

export default class PlayerInfo extends React.Component {

  constructor(props) {
    super(props);
    this.player = Players[props.player];
    this.playerChangeListener = new ChangeListener(this.playerDataChanged);
    this.state = {
      score: this.player.score,
      selectedWeapon: this.player.getSelectedWeapon()
    };
  }

  componentDidMount() {
    this.player.addChangeListener(this.playerChangeListener);
  }

  componentWillUnmount() {
    this.player.removeChangeListener(this.playerChangeListener);
  }

  render() {
    const weaponImage = this.state.selectedWeapon ? (
      <img
        alt={`Selected weapon of player ${this.props.player +1}`}
        className="selected-weapon"
        src={ this.state.selectedWeapon.imageRotated } />
    ) : null;

    return (
      <div className="player-info">
        <img 
          alt={`Portrait of player ${this.props.player +1}`}
          className="player-portrait" 
          src={`images/backgrounds/portrait-player-${this.props.player +1}.jpg`} />
        
        <div className="score-container">
          <h2>{ this.state.score }</h2>
        </div>

        <div className="weapon-container">
          { weaponImage }
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

  playerDataChanged = () => {
    this.setState({
      score: this.player.score,
      selectedWeapon: this.player.getSelectedWeapon()
    });
  }

}