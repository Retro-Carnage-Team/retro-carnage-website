import React from "react";

import Missions from "../../game/Missions";

import styles from "./MissionBriefing.module.css";

export interface MissionBriefingProps {
  mission: string;
}

function MissionBriefing(props: MissionBriefingProps) {
  if (!props.mission) {
    return (
      <div className={styles.missionBriefingEmpty}>
        <div className={styles.space0} />
        <h1>Missions available</h1>
      </div>
    );
  } else {
    const mission = Missions.find((m) => m.name === props.mission);
    return (
      <div className={styles.missionBriefingSelected}>
        <img src={mission?.client} alt="client" />
        <p>{mission?.briefing}</p>
      </div>
    );
  }
}

export default MissionBriefing;
