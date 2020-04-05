import React from 'react';
import './GameScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';

function GameScreen(props) {
  function moveToNextScreen() {
    props.onScreenChangeRequired(MAP_SCREEN_NAME);
  }

  return (
    <div className="title-screen" onClick={ moveToNextScreen }>
      <h1>GAME SCREEN</h1>

      <div className="space-0" />
      <p className="hint" onClick={ moveToNextScreen }>Click to finish level</p>
    </div>
  );
}

export const GAME_SCREEN_NAME = "game";
export default GameScreen;