import React from "react";

import Renderer from "../../game/engine/Renderer";
import PlayerInfo from "./PlayerInfo";
import Engine, { SCREEN_SIZE } from "../../game/engine/Engine";
import MissionController from "../../game/MissionController";
import SoundBoard from "../../game/SoundBoard";

import styles from "./GameScreen.module.css";

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
      }
    }

    this.lastFrame = timestamp;
    if (this.running) {
      window.requestAnimationFrame(this.renderGame);
    }
  };
}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;
