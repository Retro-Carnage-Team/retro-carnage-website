import React, { useEffect, useState } from "react";

import ChangeListener from "../../game/ChangeListener";
import InputController, { PROP_BUTTON } from "../../game/InputController";
import { CONFIGURATION_SCREEN_NAME } from "../configuration/ConfigurationScreen";
import SoundBoard, { MUSIC_THEME } from "../../game/SoundBoard";

import styles from "./TitleScreen.module.css";

export interface TitleScreenProps {
  onScreenChangeRequired: (screenName: string) => void;
}

function TitleScreen(props: TitleScreenProps) {
  function handleInputControllerInput(value: any, property: string) {
    if (PROP_BUTTON === property) {
      props.onScreenChangeRequired(CONFIGURATION_SCREEN_NAME);
    }
  }

  const [inputControllerListener] = useState(
    new ChangeListener(handleInputControllerInput)
  );

  useEffect(() => {
    InputController.startGuiMode();
    InputController.addChangeListener(inputControllerListener);
    setTimeout(() => SoundBoard.play(MUSIC_THEME), 500);

    return function cleanUp() {
      InputController.removeChangeListener(inputControllerListener);
      InputController.stopGuiMode();
    };
  }, [inputControllerListener]);

  return (
    <div
      className={styles.screen}
      onClick={() => props.onScreenChangeRequired(CONFIGURATION_SCREEN_NAME)}
    >
      <img src="images/backgrounds/title.jpg" alt="" />
    </div>
  );
}

export const TITLE_SCREEN_NAME = "title";
export default TitleScreen;
