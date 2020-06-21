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

  getNextMissionNorth = (relativeTo) => {
    return this.getRemainingMissions()
      .filter((m) => m.location.latitude < relativeTo.location.latitude)
      .sort((a, b) => a.location.latitude - b.location.latitude)
      .pop();
  }

  getNextMissionSouth = (relativeTo) => {
    return this.getRemainingMissions()
      .filter((m) => m.location.latitude > relativeTo.location.latitude)
      .sort((a, b) => a.location.latitude - b.location.latitude)
      .shift();
  }

  getNextMissionWest = (relativeTo) => {
    return this.getRemainingMissions()
      .filter((m) => m.location.longitude < relativeTo.location.longitude)
      .sort((a, b) => a.location.longitude - b.location.longitude)
      .pop();
  }

  getNextMissionEast = (relativeTo) => {
    return this.getRemainingMissions()
      .filter((m) => m.location.longitude > relativeTo.location.longitude)
      .sort((a, b) => a.location.longitude - b.location.longitude)
      .shift();
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
