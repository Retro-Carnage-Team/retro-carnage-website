import React from 'react';
import './App.css';

import BuyYourWeaposScreen, { BUY_YOUR_WEAPONS_SCREEN_NAME } from './screens/buy-your-weapons/BuyYourWeaponsScreen'
import GameScreen, { GAME_SCREEN_NAME } from './screens/game/GameScreen';
import LetsBeginScreen, { LETS_BEGIN_MESSAGE_SCREEN_NAME } from './screens/lets-begin/LetsBeginScreen';
import LoadingScreen, { LOADING_SCREEN_NAME } from './screens/loading/LoadingScreen';
import MapScreen, { MAP_SCREEN_NAME } from './screens/map/MapScreen';
import ShopScreen, { SHOP_SCREEN_NAME } from './screens/shop/ShopScreen';
import StartScreen, { START_SCREEN_NAME } from './screens/start/StartScreen';
import TitleScreen, { TITLE_SCREEN_NAME } from './screens/title/TitleScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { screen: LOADING_SCREEN_NAME };
  }

  handleScreenChangeRequired = (screenName) => {
    this.setState({ screen: screenName });
  }

  render() {
    var screen = undefined;
    switch(this.state.screen) {
        case BUY_YOUR_WEAPONS_SCREEN_NAME:
          screen = <BuyYourWeaposScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case GAME_SCREEN_NAME:
          screen = <GameScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case LETS_BEGIN_MESSAGE_SCREEN_NAME:
          screen = <LetsBeginScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case LOADING_SCREEN_NAME:
          screen = <LoadingScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case MAP_SCREEN_NAME:
          screen = <MapScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case SHOP_SCREEN_NAME:
          screen = <ShopScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case START_SCREEN_NAME:
          screen = <StartScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        case TITLE_SCREEN_NAME:
          screen = <TitleScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
          break;
        default:
          screen = <LoadingScreen onScreenChangeRequired={ this.handleScreenChangeRequired }/>;
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