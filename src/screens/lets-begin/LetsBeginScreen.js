import React, { useEffect, useState } from 'react';
import './LetsBeginScreen.css';
import { GAME_SCREEN_NAME } from '../game/GameScreen';

function LetsBeginMessageScreen(props) {
  const [height, setHeight] = useState(100);

  useEffect(() => { 
    setHeight(window.innerHeight / 2 - 40);
  }, []);

  function moveToNextScreen() {
    props.onScreenChangeRequired(GAME_SCREEN_NAME);
  }

  setTimeout(moveToNextScreen, 4000);

  return (
    <div className="lets-begin-screen">
      <div style={{ height: `${height}px` }} />
      <h1>Let the mission begin!</h1>
    </div>
  );
}

export const LETS_BEGIN_MESSAGE_SCREEN_NAME = 'lets_begin';
export default LetsBeginMessageScreen;
