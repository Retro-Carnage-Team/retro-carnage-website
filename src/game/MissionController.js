import Missions from './Missions';

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
        return Missions.filter(m => !this.finishedMissions.find(e => e === m.name));        
    }

    markMissionFinished = (missionName) => {        
        this.finishedMissions.push(missionName);        
    }    

}

const levelControllerInstance = new LevelController();
export default levelControllerInstance;