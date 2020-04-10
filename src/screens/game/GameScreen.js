import React from 'react';
import './GameScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';
import GamepadController from '../../game/GamepadController';
import KeyboardController from '../../game/KeyboardController';


class GameScreen extends React.Component {

  componentDidMount() {
    GamepadController.setUp(window);
    KeyboardController.setUp(window);
  }

  componentWillUnmount() {
    GamepadController.tearDown(window);
    KeyboardController.tearDown(window);
  }

  render() {
    return (
      <canvas id="game">
        Guru meditation: &lt;Canvas&gt; element not supported!
      </canvas>
    );
  }

  moveToNextScreen = () => {
    this.props.onScreenChangeRequired(MAP_SCREEN_NAME);
  }

}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;