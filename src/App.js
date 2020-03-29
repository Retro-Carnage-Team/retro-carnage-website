import React from 'react';
import './App.css';

import StartScreen, { START_SCREEN_NAME } from './screens/start/StartScreen';
import TitleScreen, { TITLE_SCREEN_NAME } from './screens/title/TitleScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: START_SCREEN_NAME
    };
  }

  handleScreenChangeRequired = (screenName) => {
    this.setState({ 
      screen: screenName 
    });    
  }

  render() {
    var screen = undefined;
    switch(this.state.screen) {
        case START_SCREEN_NAME:
          screen = <StartScreen onScreenChangeRequired={ this.handleScreenChangeRequired } />;
          break;
        case TITLE_SCREEN_NAME:
          screen = <TitleScreen />;
          break;
        default:
          screen = <StartScreen onScreenChangeRequired={ this.handleScreenChangeRequired } />;
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