import React from 'react';
import './GameScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';
import GamepadController from '../../game/GamepadController';
import KeyboardController from '../../game/KeyboardController';


class GameScreen extends React.Component {

  componentDidMount() {
    document.addEventListener('keydown', KeyboardController.processKeyDown);
    document.addEventListener('keyup', KeyboardController.processKeyUp);
    GamepadController.initialize(window.navigator);
    setInterval(this.testGamepad, 100);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', KeyboardController.processKeyDown);
    document.removeEventListener('keyup', KeyboardController.processKeyUp);
  }

  render() {
    return (
      <canvas id="game">
        Guru meditation: &lt;Canvas&gt; element not supported!
      </canvas>
    );
  }

  testGamepad = () => {
    console.debug(GamepadController.getInputState(0));
  }

  moveToNextScreen = () => {
    this.props.onScreenChangeRequired(MAP_SCREEN_NAME);
  }

}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;