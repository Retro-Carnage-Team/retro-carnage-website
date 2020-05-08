import Missions from './Missions';
import PlayerController from './PlayerController';

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
      PlayerController.getRemainingPlayers().forEach((p) => p.cash = p.cash + this.currentMission.reward);
    }
  }

}

const missionControllerInstance = new MissionController();
export default missionControllerInstance;
