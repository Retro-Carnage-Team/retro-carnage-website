import React from 'react';
import './App.css';

import MapScreen, { MAP_SCREEN_NAME } from './screens/map/MapScreen';
import StartScreen, { START_SCREEN_NAME } from './screens/start/StartScreen';
import TitleScreen, { TITLE_SCREEN_NAME } from './screens/title/TitleScreen';
import SoundBoard from './game/SoundBoard';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: START_SCREEN_NAME
    };
    this.soundBoard = new SoundBoard();
  }

  handleScreenChangeRequired = (screenName) => {
    this.setState({ 
      screen: screenName 
    });    
  }

  render() {
    var screen = undefined;
    switch(this.state.screen) {
        case MAP_SCREEN_NAME:
          screen = <MapScreen onScreenChangeRequired={ this.handleScreenChangeRequired } 
                              soundBoard={ this.soundBoard }/>;
          break;
        case START_SCREEN_NAME:
          screen = <StartScreen onScreenChangeRequired={ this.handleScreenChangeRequired } 
                                soundBoard={ this.soundBoard }/>;
          break;
        case TITLE_SCREEN_NAME:
          screen = <TitleScreen onScreenChangeRequired={ this.handleScreenChangeRequired } 
                                soundBoard={ this.soundBoard }/>;
          break;
        default:
          screen = <StartScreen onScreenChangeRequired={ this.handleScreenChangeRequired } 
                                soundBoard={ this.soundBoard }/>;
          break;
    }
    return (
      <div className="App">
        { screen }
      </div>
    );
  }
}

export default App;