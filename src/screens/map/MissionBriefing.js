import React from 'react';
import './MissionBriefing.css';
import Levels from '../../game/Levels';

function MissionBriefing(props) {
  if(!props.mission) {
    return (
      <div className="mission-briefing empty">
        <div className="space-0" />
        <h1>Missions available</h1>      
      </div>
    );
  } else {
    const mission = Levels.find(m => m.name === props.mission);    
    return (
      <div className="mission-briefing selected">
        <img src={ mission.client } alt="client"></img>        
        <p>{ mission.briefing }</p>
      </div>      
    );
  }  
}

export default MissionBriefing;