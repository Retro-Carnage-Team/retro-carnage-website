import React from 'react';
import './GameScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';
import GamepadController from '../../game/GamepadController';
import KeyboardController from '../../game/KeyboardController';
import Renderer from '../../game/Renderer';

class GameScreen extends React.Component {

  constructor(props) {
    super(props);
    this.lastFrame = undefined;
    this.renderer = undefined;
    this.running = true;
  }

  componentDidMount() {
    GamepadController.setUp(window);
    KeyboardController.setUp(window);
    
    const canvas = document.getElementById("game");
    this.renderer = new Renderer(canvas, canvas.getContext("2d"));

    window.requestAnimationFrame(this.renderGame);
  }

  componentWillUnmount() {
    GamepadController.tearDown(window);
    KeyboardController.tearDown(window);
    this.running = false;
  }

  render() {
    return (
      <canvas id="game">
        Guru meditation: &lt;Canvas&gt; element not supported!
      </canvas>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
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