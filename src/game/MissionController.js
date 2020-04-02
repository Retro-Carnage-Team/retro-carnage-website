const KEY_CURRENT_MISSION = "current_mission";
const KEY_FINISHED_MISSIONS = "finished_missions";

import Missions from './Missions';

class LevelController {

    reset = () => {
        sessionStorage.removeItem(KEY_CURRENT_MISSION);
        sessionStorage.setItem(KEY_FINISHED_MISSIONS, "[]");
    }

    getRemainingMissions = () => {
        const finished = JSON.parse(sessionStorage.getItem(KEY_FINISHED_MISSIONS));        
        const result = Missions.filter(m => !finished.find(e => e === m.name));        
        return result;
    }

    markMissionFinished = (missionName) => {
        var finishedMissions = JSON.parse(sessionStorage.getItem(KEY_FINISHED_MISSIONS));        
        finishedMissions.push(missionName);        
        sessionStorage.setItem(KEY_FINISHED_MISSIONS, JSON.stringify(finishedMissions));
    }

    getSelectedMission = () => {
        return sessionStorage.getItem(KEY_CURRENT_MISSION);
    }

    setSelectedMission = (missionName) => {
        if(!missionName) {
            sessionStorage.removeItem(KEY_CURRENT_MISSION);
        } else {
            sessionStorage.setItem(KEY_CURRENT_MISSION, missionName);
        }        
    }

}

const levelControllerInstance = new LevelController();

export default levelControllerInstance;