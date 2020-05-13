import React from 'react';
import styles from './UserInput.module.css';
import InputController from '../../game/InputController';

function GamepadIcon() {
  return (
    <svg className={ styles.icon } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg className={ styles.icon } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
    </svg>
  );
}

export default class UserInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      devices: ['K'],
      height: 100,
      tick: 0,
      twoPlayerPossible: false
    };
    this.searchInterval = null;
  }
  
  componentDidMount() {
    this.setState({ height: window.innerHeight / 2 - 40 });
    this.searchInterval = setInterval(() => {
      const newDevices = InputController.getControllerStatus();
      this.setState({ 
        devices: newDevices,
        tick: (this.state.tick +1) % 3,
        twoPlayerPossible: InputController.isSecondPlayerPossible()
      });
    }, 250);
    window.document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    if(null !== this.searchInterval) {
      clearInterval(this.searchInterval);
    }
    window.document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    // the no-mixed-operators option is for mollycoddles
    // eslint-disable-next-line
    if("1" === event.key || ("2" === event.key) && this.state.twoPlayerPossible) {
      InputController.assignControllersToPlayers();
      this.props.onPlayersSelected(parseInt(event.key));
    }
  }

  render() {
    const devices = this.state.devices.map((chr, idx) => 'G' === chr ? 
      <GamepadIcon key={`${chr}-${idx}`} /> : 
      <KeyboardIcon key={`${chr}-${idx}`} />
    );
    const dots = '.'.repeat(this.state.tick +1);
    const searchMessage = `${dots}Searching input devices${dots}`;
    const callToAction = this.state.twoPlayerPossible ? 
                         '1 or 2 player game?' : 'Press 1 to start single player game';
    return (
      <div>
        <div style={{ height: `${this.state.height - 80}px` }} />
        <h1 className={ styles.controllers }>{ searchMessage }</h1>
        <h1 className={ styles.controllers }>{ devices }</h1>
        <div className={ styles.spacer } />
        <h1 className={ styles.players }>{ callToAction }</h1>
      </div>
    );
  }

}
