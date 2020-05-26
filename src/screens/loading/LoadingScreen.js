import React, { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';
import { START_SCREEN_NAME } from '../start/StartScreen';
import SoundBoard, { FX_LOADING } from '../../game/SoundBoard';

function LoadingScreen(props) {
  const [height, setHeight] = useState(100);

  useEffect(() => { 
    setHeight(window.innerHeight / 2 - 80);
    SoundBoard.play(FX_LOADING);
  }, []);

  function moveToNextScreen() {
    props.onScreenChangeRequired(START_SCREEN_NAME);
  }

  setTimeout(moveToNextScreen, 8000);

  return (
    <div className={ styles.screen }>
      <div style={{ height: `${height}px` }} />
      <h1>Retro Carnage</h1>
      <h1>is loading</h1>
    </div>
  );
}

export const LOADING_SCREEN_NAME = 'loading';
export default LoadingScreen;
