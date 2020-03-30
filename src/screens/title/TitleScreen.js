import React from 'react';
import './TitleScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';

function TitleScreen(props) {
  function moveToNextScreen() {
    if("function" === typeof props.onScreenChangeRequired) {
      props.onScreenChangeRequired(MAP_SCREEN_NAME);
    }
  }

  return (
    <div className="TitleScreen" onClick={ moveToNextScreen }>
      <h1>TITLE SCREEN</h1>

      <div className="space-0" />
      <p className="hint">Click to select your mission</p>
    </div>
  );
}

export const TITLE_SCREEN_NAME = "title";
export default TitleScreen;