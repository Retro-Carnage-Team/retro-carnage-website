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
    this.currentMission = Missions.find((m) => m.name === missionName);
    if(this.currentMission) {
      Players[0].cash = Players[0].cash + (Players[0].isAlive() ? this.currentMission.reward : 0);
      Players[1].cash = Players[1].cash + (Players[1].isAlive() ? this.currentMission.reward : 0);
    }
  }

}

const missionControllerInstance = new MissionController();
export default missionControllerInstance;
