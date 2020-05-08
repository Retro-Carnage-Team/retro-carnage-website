import React from 'react';
import './GameScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';
import Renderer from '../../game/Renderer';
import PlayerInfo from './PlayerInfo';
import Players from '../../game/Player';
import MissionController from '../../game/MissionController';
import SoundBoard from '../../game/SoundBoard';

class GameScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { playerInfoWidth: 1 };
  }

  componentDidMount() {
    this.updateDimensions();
    SoundBoard.play(MissionController.currentMission.music);

    const canvas = document.getElementById('game');
    this.renderer = new Renderer(canvas);

    this.running = true;
    window.addEventListener("resize", this.updateDimensions);
    window.requestAnimationFrame(this.renderGame);
  }

  componentWillUnmount() {
    SoundBoard.stop(MissionController.currentMission.music);

    this.running = false;
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="game-screen">
        <div className="left" style={{ width: this.state.playerInfoWidth +'px' }}>
          <PlayerInfo player={ 0 } />
        </div>
        <canvas
          className="left"
          id="game"
          onClick={ this.handleClick }
          style={{ width: `calc(100% - ${this.state.playerInfoWidth}px - ${this.state.playerInfoWidth}px)` }}>
          Guru meditation: &lt;Canvas&gt; element not supported!
        </canvas>
        <div className="right" style={{ width: this.state.playerInfoWidth +'px' }}>
          <PlayerInfo player={ 1 } />
        </div>
      </div>
    );
  }

  updateDimensions = () => {
    this.setState({ playerInfoWidth: (window.innerWidth - window.innerHeight) / 2 });
  }

  renderGame = (timestamp) => {
    if(undefined !== this.lastFrame)
      this.renderer.render(timestamp - this.lastFrame);
    this.lastFrame = timestamp;
    if(this.running)
      window.requestAnimationFrame(this.renderGame);
  }

  handleClick = () => {
    // This is for debugging only and can be removed.
    Players[0].selectNextWeapon();
  }

  moveToNextScreen = () => {
    this.props.onScreenChangeRequired(MAP_SCREEN_NAME);
  }

}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;