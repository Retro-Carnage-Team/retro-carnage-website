import React from 'react';
import './PlayerInfo.css';
import Players, {
  PROP_AMMUNITION,
  PROP_GRENADES,
  PROP_LIVES,
  PROP_SCORE,
  PROP_SELECTED_WEAPON
} from '../../game/Player';
import ChangeListener from '../../game/ChangeListener';

function playerToState(player) {
  const { lives, score } = player;
  return {
    ammunition: player.getAmmunitionCountForSelectedWeapon(),
    lives,
    score,
    selectedWeapon: player.getSelectedWeapon()
  };
}

export default class PlayerInfo extends React.Component {

  constructor(props) {
    super(props);
    this.player = Players[props.player];
    this.playerChangeListener = new ChangeListener(
      this.playerDataChanged, PROP_AMMUNITION, PROP_GRENADES, PROP_LIVES, PROP_SCORE, PROP_SELECTED_WEAPON
    );
    this.state = playerToState(this.player);
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

    const liveImages = (0 < this.state.lives) ? []: 'M.I.A.';
    for(let i=0; i<this.state.lives; i++) {
      const path = `images/backgrounds/life-player-${this.props.player +1}.png`;
      liveImages.push(<img key={`life-${i}`} src={path} alt="" />);
    }

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
          <h2>{ this.state.ammunition }</h2>
        </div>

        <div className="lives-container">
          { liveImages }
        </div>
      </div>
    );
  }

  playerDataChanged = () => {
    this.setState(playerToState(this.player));
  }

}