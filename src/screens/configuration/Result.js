import React, { useEffect, useState } from 'react';
import './Result.css';
import InputController from '../../game/InputController';

export default function Result(props) {
  const [height, setHeight] = useState(100);

  useEffect(() => { 
    setHeight(window.innerHeight / 2 - 40);
  }, []);

  const msgPlayer2 = 2 === props.numberOfPlayers ? 
                     <h1 className="controller-info">player 2: use { InputController.getControllerInfo(1) }</h1> : null;
  return (
    <div className="result">
      <div style={{ height: `${height -80}px` }} />
      <h1 className="number-of-players">{ props.numberOfPlayers } player game</h1>
      <div className="spacer" />
      <h1 className="controller-info">player 1: use { InputController.getControllerInfo(0) }</h1>
      { msgPlayer2 }
    </div>
  );
}
