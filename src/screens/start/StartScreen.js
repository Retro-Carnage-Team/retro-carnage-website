import React from 'react';
import './StartScreen.css';
import { TITLE_SCREEN_NAME } from '../title/TitleScreen';

function StartScreen(props) {

  function moveToNextScreen() {
    if("function" === typeof props.onScreenChangeRequired) {
      props.onScreenChangeRequired(TITLE_SCREEN_NAME);
    }
  }

  setTimeout(moveToNextScreen, 2000);

  return (
    <div className="StartScreen">
      <div className="space-0" />
      <h1>DOGS OF WAR II</h1>

      <div className="space-1" />
      <p className="copyright">(C) 2020 THOMAS WERNER</p>

      <div className="space-2" />
      <p className="inspired-by">
          INSPIRED BY "DOGS OF WAR"<br />
          (C) 1989 BY ELITE SYSTEMS LTD.
      </p>
    </div>
  );
}

export const START_SCREEN_NAME = "start";
export default StartScreen;