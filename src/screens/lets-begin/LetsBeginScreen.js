import React, { useEffect, useState } from "react";

import { GAME_SCREEN_NAME } from "../game/GameScreen";

import styles from "./LetsBeginScreen.module.css";

function LetsBeginMessageScreen(props) {
  const [height, setHeight] = useState(100);

  useEffect(() => {
    setHeight(window.innerHeight / 2 - 40);
    // TODO: preload backgrounds of selected level
  }, []);

  function moveToNextScreen() {
    props.onScreenChangeRequired(GAME_SCREEN_NAME);
  }

  setTimeout(moveToNextScreen, 4000);

  return (
    <div className={styles.screen}>
      <div style={{ height: `${height}px` }} />
      <h1>Let the mission begin!</h1>
    </div>
  );
}

export const LETS_BEGIN_MESSAGE_SCREEN_NAME = "lets_begin";
export default LetsBeginMessageScreen;
