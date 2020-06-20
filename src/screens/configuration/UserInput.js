import React from 'react';
import cn from 'classnames';

import ChangeListener from '../../game/ChangeListener';
import {DIRECTION_DOWN, DIRECTION_UP} from '../../game/engine/Directions';
import GamepadIcon from '../../components/GamepadIcon';
import InputController, {PROP_BUTTON, PROP_DIRECTION} from '../../game/InputController';
import KeyboardIcon from '../../components/KeyboardIcon';

import styles from './UserInput.module.css';

export default class UserInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      height: 100,
      selectedGameMode: 1
    };
    this.inputControllerListener = new ChangeListener(this.handleInputControllerInput);
  }
  
  componentDidMount() {
    const [inputPlayer1, inputPlayer2] = InputController.getControllerStatus();
    this.setState({
      height: window.innerHeight / 2 - 40,
      inputPlayer1,
      inputPlayer2
    });
    InputController.startGuiMode();
    InputController.addChangeListener(this.inputControllerListener);
  }

  componentWillUnmount() {
    InputController.removeChangeListener(this.inputControllerListener);
    InputController.stopGuiMode();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.centered}>
          <div className={styles.playerInfoContainer}>
            <div>
              <img className={styles.portrait} src="/images/backgrounds/portrait-player-1.jpg" alt="Player 1" />
              <div className={styles.input}>
                <p>
                  {this.getIconForInputType(this.state.inputPlayer1)}
                  {this.getNameForInputType(this.state.inputPlayer1)}
                </p>
              </div>
            </div>
            <div>
              <img className={styles.portrait} src="/images/backgrounds/portrait-player-2.jpg" alt="Player 2" />
              <div className={styles.input}>
                <p>
                  {this.getIconForInputType(this.state.inputPlayer2)}
                  {this.getNameForInputType(this.state.inputPlayer2)}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.modeSelectionContainer}>
            <h1 className={cn(
              styles.gameMode,
              1 === this.state.selectedGameMode ? styles.selected : null
            )} onClick={() => this.setGameMode(1)}>
              Start 1 player game
            </h1>
            <h1 className={cn(
              styles.gameMode,
              InputController.isSecondPlayerPossible() ? null : styles.hidden,
              2 === this.state.selectedGameMode ? styles.selected : null
            )} onClick={() => this.setGameMode(2)}>
              Start 2 player game
            </h1>
          </div>
        </div>
      </div>
    );
  }

  handleInputControllerInput = (value, property) => {
    const [inputPlayer1, inputPlayer2] = InputController.getControllerStatus();
    this.setState({ inputPlayer1, inputPlayer2 });

    if(PROP_BUTTON === property) {
      this.setGameMode(this.state.selectedGameMode);
    }
    if(PROP_DIRECTION === property) {
      if((DIRECTION_DOWN === value) && (1 === this.state.selectedGameMode)) {
        this.setState({selectedGameMode: 2});
      }
      if((DIRECTION_UP === value) && (2 === this.state.selectedGameMode)) {
        this.setState({selectedGameMode: 1});
      }
    }
  }

  getIconForInputType = (type) => {
    switch(type) {
      case 'G':
        return <GamepadIcon/>;
      case 'K':
        return <KeyboardIcon/>;
      default:
        return null;
    }
  }

  getNameForInputType = (type) => {
    switch(type) {
      case 'G':
        return 'Gamepad';
      case 'K':
        return 'Keyboard';
      default:
        return 'Use gamepad to activate 2nd player';
    }
  }

  setGameMode = (numberOfPlayers) => {
    InputController.assignControllersToPlayers();
    this.props.onPlayersSelected(numberOfPlayers);
  }

}
