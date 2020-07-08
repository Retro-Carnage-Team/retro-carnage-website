import React from "react";

import ChangeListener from "../../game/ChangeListener";
import InputController, { PROP_BUTTON } from "../../game/InputController";
import { CONFIGURATION_SCREEN_NAME } from "../configuration/ConfigurationScreen";
import SoundBoard, { FX_TITLE_RIFLE, MUSIC_THEME } from "../../game/SoundBoard";

import styles from "./TitleScreen.module.css";

const BACKGROUND_WIDTH = 1280;
const BACKGROUND_HEIGHT = 720;
const ANIMATION_LENGTH = 2500;
const MUZZLE_LEFT = 814;
const MUZZLE_TOP = 457;

class TitleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.animationTimeoutIds = [];
    this.musicStarted = false;
    this.inputControllerListener = new ChangeListener(
      this.handleInputControllerInput
    );

    this.state = {
      imageSize: "100",
      muzzleFlash: false,
      scalingFactor: 1.0,
    };
  }

  replaceBackground = (src) => {
    let bg = document.getElementById("title-bg");
    if (bg) {
      bg.src = src;
    }
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    InputController.startGuiMode();
    InputController.addChangeListener(this.inputControllerListener);
    this.animationTimeoutIds.push(
      setTimeout(this.replaceBackground, 500, "images/backgrounds/title-2.jpg")
    );
    this.animationTimeoutIds.push(
      setTimeout(() => {
        SoundBoard.play(FX_TITLE_RIFLE);
        this.setState({ muzzleFlash: true });
      }, 1500)
    );
    this.animationTimeoutIds.push(
      setTimeout(() => {
        this.setState({ muzzleFlash: false });
        this.replaceBackground("images/backgrounds/title-1.jpg");
      }, 1500 + ANIMATION_LENGTH)
    );
    this.animationTimeoutIds.push(
      setTimeout(() => {
        SoundBoard.play(MUSIC_THEME);
        this.musicStarted = true;
        this.replaceBackground("images/backgrounds/title-3.jpg");
      }, 5500)
    );
  }

  componentWillUnmount() {
    this.animationTimeoutIds.forEach((id) => clearTimeout(id));
    SoundBoard.stop(FX_TITLE_RIFLE);
    if (!this.musicStarted) {
      SoundBoard.play(MUSIC_THEME);
    }
    InputController.removeChangeListener(this.inputControllerListener);
    InputController.stopGuiMode();
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className={styles.screen} onClick={this.moveToNextScreen}>
        <img
          id="title-bg"
          src="images/backgrounds/title-1.jpg"
          alt=""
          style={{ width: this.state.imageSize + "px" }}
        />
        <img
          className={styles.muzzleFlash}
          src="images/backgrounds/muzzle.gif"
          alt="muzzle flash"
          style={{
            display: this.state.muzzleFlash ? "inherit" : "none",
            left: `${
              this.state.scalingFactor * MUZZLE_LEFT +
              (window.innerWidth - this.state.imageSize) / 2
            }px`,
            top: `${this.state.scalingFactor * MUZZLE_TOP - 64}px`,
          }}
        />
      </div>
    );
  }

  updateDimensions = () => {
    const widthFactor = window.innerWidth / BACKGROUND_WIDTH;
    if (BACKGROUND_HEIGHT * widthFactor > window.innerHeight) {
      const heightFactor = window.innerHeight / BACKGROUND_HEIGHT;
      this.setState({
        imageSize: BACKGROUND_WIDTH * heightFactor,
        scalingFactor: heightFactor,
      });
    } else {
      this.setState({
        imageSize: window.innerWidth,
        scalingFactor: widthFactor,
      });
    }
  };

  moveToNextScreen = () => {
    this.props.onScreenChangeRequired(CONFIGURATION_SCREEN_NAME);
  };

  handleInputControllerInput = (value, property) => {
    if (PROP_BUTTON === property) {
      this.moveToNextScreen();
    }
  };
}

export const TITLE_SCREEN_NAME = "title";
export default TitleScreen;
