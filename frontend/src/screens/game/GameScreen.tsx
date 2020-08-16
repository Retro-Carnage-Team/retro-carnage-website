import React from "react";

import Renderer from "../../game/Renderer";
import PlayerInfo from "./PlayerInfo";
import Engine, { SCREEN_SIZE } from "../../game/Engine";
import MissionController from "../../game/MissionController";
import SoundBoard from "../../game/SoundBoard";
import { MAP_SCREEN_NAME } from "../map/MapScreen";

import styles from "./GameScreen.module.css";
import { TITLE_SCREEN_NAME } from "../title/TitleScreen";

export interface GameScreenProps {
  onScreenChangeRequired: (screenName: string) => void;
}

export interface GameScreenState {
  playerInfoWidth: number;
}

class GameScreen extends React.Component<GameScreenProps, GameScreenState> {
  engine: Engine | undefined;
  lastFrame: number;
  renderer: Renderer | undefined;
  running: boolean;

  constructor(props: GameScreenProps) {
    super(props);
    this.state = { playerInfoWidth: 1 };
    this.lastFrame = 0;
    this.running = false;
  }

  componentDidMount() {
    this.updateDimensions();

    const mission = MissionController.currentMission;
    if (mission) {
      SoundBoard.play(mission.music);
      this.engine = new Engine(mission);
      this.renderer = new Renderer(
        document.getElementById("game") as HTMLCanvasElement,
        this.engine
      );
      this.running = true;
    }

    window.addEventListener("resize", this.updateDimensions);
    window.requestAnimationFrame(this.renderGame);
  }

  componentWillUnmount() {
    const mission = MissionController.currentMission;
    if (mission) {
      SoundBoard.stop(mission.music);
    }

    this.running = false;
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className={styles.screen}>
        <div
          className={`${styles.container} ${styles.left}`}
          style={{ width: this.state.playerInfoWidth + "px" }}
        >
          <PlayerInfo player={0} />
        </div>
        <canvas
          className={styles.left}
          id="game"
          height={SCREEN_SIZE}
          style={{
            width: `calc(100% - ${this.state.playerInfoWidth}px - ${this.state.playerInfoWidth}px)`,
          }}
          width={SCREEN_SIZE}
        >
          Guru meditation: &lt;Canvas&gt; element not supported!
        </canvas>
        <div
          className={`${styles.container} ${styles.right}`}
          style={{ width: this.state.playerInfoWidth + "px" }}
        >
          <PlayerInfo player={1} />
        </div>
      </div>
    );
  }

  updateDimensions = () => {
    this.setState({
      playerInfoWidth: (window.innerWidth - window.innerHeight) / 2,
    });
  };

  renderGame = (timestamp: number) => {
    if (!this.lastFrame) {
      if (this.engine) {
        this.engine.initializeGameState();
      }
    } else {
      const elapsedTimeInMs = timestamp - this.lastFrame;
      if (this.engine && this.renderer) {
        this.engine.updateGameState(elapsedTimeInMs);
        this.renderer.render(elapsedTimeInMs);
        this.running = !(this.engine.lost || this.engine.won);
      }
    }

    if (this.running) {
      this.lastFrame = timestamp;
      window.requestAnimationFrame(this.renderGame);
    } else {
      if (this.engine && this.engine.won) {
        this.handleMissionWon();
      } else if (this.engine && this.engine.lost) {
        this.handleGameLost();
      }
    }
  };

  handleGameLost = () => {
    // TODO: show high score screen (https://github.com/huddeldaddel/retro-carnage/issues/26)
    this.props.onScreenChangeRequired(TITLE_SCREEN_NAME);
  };

  handleMissionWon = () => {
    this.running = false;
    // TODO: Show level end animation (https://github.com/huddeldaddel/retro-carnage/issues/25)
    const mission = MissionController.currentMission;
    if (mission) {
      MissionController.markMissionFinished(mission.name);
      if (0 === MissionController.getRemainingMissions().length) {
        // TODO: show high score screen (https://github.com/huddeldaddel/retro-carnage/issues/26)
      } else {
        this.props.onScreenChangeRequired(MAP_SCREEN_NAME);
      }
    }
  };
}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;
