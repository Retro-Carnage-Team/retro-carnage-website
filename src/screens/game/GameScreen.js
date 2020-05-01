import React from 'react';
import './GameScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';
import GamepadController from '../../game/GamepadController';
import KeyboardController from '../../game/KeyboardController';
import Renderer from '../../game/Renderer';
import PlayerInfo from './PlayerInfo';

class GameScreen extends React.Component {

  constructor(props) {
    super(props);
    this.lastFrame = undefined;
    this.renderer = undefined;
    this.running = true;
    this.state = { playerInfoWidth: 1 };
  }

  componentDidMount() {
    this.updateDimensions();

    GamepadController.setUp(window);
    KeyboardController.setUp(window);
    
    const canvas = document.getElementById("game");
    this.renderer = new Renderer(canvas, canvas.getContext("2d"));

    window.addEventListener("resize", this.updateDimensions);
    window.requestAnimationFrame(this.renderGame);
  }

  componentWillUnmount() {
    GamepadController.tearDown(window);
    KeyboardController.tearDown(window);
    this.running = false;
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="game-screen">
        <div className="left" style={{ width: this.state.playerInfoWidth +'px' }}>
          <PlayerInfo player="1" />
        </div>
        <canvas
          className="left"
          id="game"
          style={{ width: `calc(100% - ${this.state.playerInfoWidth}px - ${this.state.playerInfoWidth}px)` }}>
          Guru meditation: &lt;Canvas&gt; element not supported!
        </canvas>
        <div className="right" style={{ width: this.state.playerInfoWidth +'px' }}>
          <PlayerInfo player="2" />
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

  moveToNextScreen = () => {
    this.props.onScreenChangeRequired(MAP_SCREEN_NAME);
  }

}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;