import React from "react";

import Backend from "./game/Backend";
import ConfigurationScreen, {
  CONFIGURATION_SCREEN_NAME,
} from "./screens/configuration/ConfigurationScreen";
import GameScreen, { GAME_SCREEN_NAME } from "./screens/game/GameScreen";
import LetsBeginScreen, {
  LETS_BEGIN_MESSAGE_SCREEN_NAME,
} from "./screens/lets-begin/LetsBeginScreen";
import LoadingScreen, {
  LOADING_SCREEN_NAME,
} from "./screens/loading/LoadingScreen";
import MapScreen, { MAP_SCREEN_NAME } from "./screens/map/MapScreen";
import ShoppingFlow, {
  SHOPPING_FLOW_NAME,
} from "./screens/shopping-flow/ShoppingFlow";
import StartScreen, { START_SCREEN_NAME } from "./screens/start/StartScreen";
import TitleScreen, { TITLE_SCREEN_NAME } from "./screens/title/TitleScreen";

import styles from "./App.module.css";

interface AppState {
  screen: string;
}

class App extends React.Component<Readonly<{}>, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      screen: LOADING_SCREEN_NAME,
    };
  }

  componentDidMount() {
    window.addEventListener("error", Backend.reportError);
    Backend.startGameSession();
  }

  componentWillUnmount() {
    window.removeEventListener("error", Backend.reportError);
  }

  render() {
    let screen;
    switch (this.state.screen) {
      case CONFIGURATION_SCREEN_NAME:
        screen = (
          <ConfigurationScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      case GAME_SCREEN_NAME:
        screen = (
          <GameScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      case LETS_BEGIN_MESSAGE_SCREEN_NAME:
        screen = (
          <LetsBeginScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      case LOADING_SCREEN_NAME:
        screen = (
          <LoadingScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      case MAP_SCREEN_NAME:
        screen = (
          <MapScreen onScreenChangeRequired={this.handleScreenChangeRequired} />
        );
        break;
      case SHOPPING_FLOW_NAME:
        screen = (
          <ShoppingFlow
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      case START_SCREEN_NAME:
        screen = (
          <StartScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      case TITLE_SCREEN_NAME:
        screen = (
          <TitleScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
      default:
        screen = (
          <LoadingScreen
            onScreenChangeRequired={this.handleScreenChangeRequired}
          />
        );
        break;
    }
    return <div className={styles.app}>{screen}</div>;
  }

  handleScreenChangeRequired = (screenName: string) => {
    if (this.state.screen !== screenName) {
      this.setState({ screen: screenName });
      Backend.reportGameState(screenName);
    }
  };
}

export default App;
