import Missions from './Missions';
import Players from './Player';

class MissionController {

  constructor() {
    this.currentMission = null;
    this.finishedMissions = [];
  }

  reset = () => {
    this.currentMission = null;
    this.finishedMissions = [];
  }

  getRemainingMissions = () => {
    return Missions.filter((m) => !this.finishedMissions.find((e) => e === m.name));
  }

  markMissionFinished = (missionName) => {
    this.finishedMissions.push(missionName);
  }

  selectMission = (missionName) => {
    this.currentMission = missionName;
    if(!!missionName) {
      const mission = Missions.find((m) => m.name === missionName);
      Players[0].cash = Players[0].cash + mission.reward;
      Players[1].cash = Players[1].cash + mission.reward;
    }
  }

}

const missionControllerInstance = new MissionController();
export default missionControllerInstance;
