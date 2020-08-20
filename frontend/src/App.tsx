import React from "react";
import styles from "./App.module.css";

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

interface AppState {
  gameId: string | null;
  screen: string;
}

const backend = "http://backend.retro-carnage.net";

class App extends React.Component<Readonly<{}>, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      gameId: null,
      screen: LOADING_SCREEN_NAME,
    };
  }

  componentDidMount() {
    this.startGameSession();
    window.addEventListener("error", this.handleErrorEvent);
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

  handleErrorEvent = (error: ErrorEvent) => {
    error.preventDefault();

    const data = JSON.stringify({
      message: error.message,
      source: error.filename,
      lineno: error.lineno,
      colno: error.colno,
      stack: error.error?.toString(),
    });

    console.error("Oh no! Sorry, that shouldn't have happened :'(");
    console.error(`Error: ${data}`);

    fetch(`${backend}/script-errors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then(() => console.log("Error has been reported"))
      .catch((error) => console.error("Failed to report the error:", error));
  };

  handleScreenChangeRequired = (screenName: string) => {
    if (this.state.screen !== screenName) {
      this.setState({ screen: screenName });
      const gameId = this.state.gameId;
      if (null !== gameId) {
        fetch(`${backend}/usage/${gameId}/next-screen/${screenName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((error) =>
          console.error("Failed to notify server about game progress", error)
        );
      }
    }
  };

  startGameSession = () => {
    const _this = this;
    fetch(`${backend}/usage/start-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => _this.setState({ gameId: data.gameId }))
      .catch((error) =>
        console.error("Failed to notify server about start", error)
      );
  };
}

export default App;
