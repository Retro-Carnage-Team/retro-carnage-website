import React from 'react';
import styles from './GameScreen.module.css';
import Renderer from '../../game/engine/Renderer';
import PlayerInfo from './PlayerInfo';
import Engine, { SCREEN_SIZE } from '../../game/engine/Engine';
import MissionController from '../../game/MissionController';
import SoundBoard from '../../game/SoundBoard';

class GameScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { playerInfoWidth: 1 };
    this.lastFrame = 0;
  }

  componentDidMount() {
    this.updateDimensions();
    SoundBoard.play(MissionController.currentMission.music);

    this.engine = new Engine(MissionController.currentMission);
    this.renderer = new Renderer(document.getElementById('game'), this.engine);

    this.running = true;
    window.addEventListener('resize', this.updateDimensions);
    window.requestAnimationFrame(this.renderGame);
  }

  componentWillUnmount() {
    SoundBoard.stop(MissionController.currentMission.music);

    this.running = false;
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <div className={ styles.screen }>
        <div className={ `${styles.container} ${styles.left}` } style={{ width: this.state.playerInfoWidth +'px' }}>
          <PlayerInfo player={ 0 } />
        </div>
        <canvas
          className={ styles.left }
          id="game"
          height={ SCREEN_SIZE }
          style={{ width: `calc(100% - ${this.state.playerInfoWidth}px - ${this.state.playerInfoWidth}px)` }}
          width={ SCREEN_SIZE }>
          Guru meditation: &lt;Canvas&gt; element not supported!
        </canvas>
        <div className={ `${styles.container} ${styles.right}` } style={{ width: this.state.playerInfoWidth +'px' }}>
          <PlayerInfo player={ 1 } />
        </div>
      </div>
    );
  }

  updateDimensions = () => {
    this.setState({ playerInfoWidth: (window.innerWidth - window.innerHeight) / 2 });
  }

  renderGame = (timestamp) => {
    if(!this.lastFrame) {
      this.engine.initializeGameState();
    } else {
      const elapsedTimeInMs = timestamp - this.lastFrame;
      this.engine.updateGameState(elapsedTimeInMs);
      this.renderer.render(elapsedTimeInMs);
    }

    this.lastFrame = timestamp;
    if(this.running) {
      window.requestAnimationFrame(this.renderGame);
    }
  }

}

export const GAME_SCREEN_NAME = 'game';
export default GameScreen;
