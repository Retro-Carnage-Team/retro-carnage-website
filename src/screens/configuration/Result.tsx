import React, { useEffect, useState } from "react";

import InputController from "../../game/InputController";

import styles from "./Result.module.css";

export interface ResultProps {
  numberOfPlayers: number;
}

export default function Result(props: ResultProps) {
  const [height, setHeight] = useState(100);

  useEffect(() => {
    setHeight(window.innerHeight / 2 - 40);
  }, []);

  const msgPlayer2 =
    2 === props.numberOfPlayers ? (
      <h1 className={styles.controller}>
        player 2: use {InputController.getControllerInfo(1)}
      </h1>
    ) : null;
  return (
    <div>
      <div style={{ height: `${height - 80}px` }} />
      <h1 className={styles.players}>{props.numberOfPlayers} player game</h1>
      <div className={styles.spacer} />
      <h1 className={styles.controller}>
        player 1: use {InputController.getControllerInfo(0)}
      </h1>
      {msgPlayer2}
    </div>
  );
}
