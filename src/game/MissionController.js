import Missions from './Missions';
import InventoryController from './InventoryController';

class LevelController {

  constructor() {
    this.currentMission = null;
    this.finishedMissions = [];
  }

  reset = () => {
    this.currentMission = null;
    this.finishedMissions = [];
  }

  getRemainingMissions = () => {        
    return Missions.filter(m => !this.finishedMissions.find((e) => e === m.name));        
  }

  markMissionFinished = (missionName) => {        
    this.finishedMissions.push(missionName);        
  }

  selectMission = (missionName) => {
    this.currentMission = missionName;
    if(!!missionName) {
      const mission = Missions.find((m) => m.name === missionName);
      InventoryController.cash = InventoryController.cash + mission.reward;
    }
  }

}

const levelControllerInstance = new LevelController();
export default levelControllerInstance;
