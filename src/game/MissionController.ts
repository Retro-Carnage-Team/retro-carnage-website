import Missions, { Mission } from "./Missions";
import PlayerController from "./PlayerController";

export type NavigatableMission = Pick<Mission, "location">;

export class MissionController {
  currentMission: Mission | null;
  finishedMissions: string[];

  constructor() {
    this.currentMission = null;
    this.finishedMissions = [];
  }

  reset = () => {
    this.currentMission = null;
    this.finishedMissions = [];
  };

  getNextMissionNorth = (
    relativeTo: NavigatableMission
  ): Mission | undefined => {
    return this.getRemainingMissions()
      .filter((m) => m.location.latitude < relativeTo.location.latitude)
      .sort((a, b) => a.location.latitude - b.location.latitude)
      .pop();
  };

  getNextMissionSouth = (
    relativeTo: NavigatableMission
  ): Mission | undefined => {
    return this.getRemainingMissions()
      .filter((m) => m.location.latitude > relativeTo.location.latitude)
      .sort((a, b) => a.location.latitude - b.location.latitude)
      .shift();
  };

  getNextMissionWest = (
    relativeTo: NavigatableMission
  ): Mission | undefined => {
    return this.getRemainingMissions()
      .filter((m) => m.location.longitude < relativeTo.location.longitude)
      .sort((a, b) => a.location.longitude - b.location.longitude)
      .pop();
  };

  getNextMissionEast = (
    relativeTo: NavigatableMission
  ): Mission | undefined => {
    return this.getRemainingMissions()
      .filter((m) => m.location.longitude > relativeTo.location.longitude)
      .sort((a, b) => a.location.longitude - b.location.longitude)
      .shift();
  };

  getRemainingMissions = (): Mission[] => {
    return Missions.filter(
      (m) => !this.finishedMissions.find((e) => e === m.name)
    );
  };

  markMissionFinished = (missionName: string) => {
    this.finishedMissions.push(missionName);
  };

  selectMission = (missionName: string) => {
    const newMission = Missions.find((m) => m.name === missionName);
    if (newMission) {
      this.currentMission = newMission;
      PlayerController.getRemainingPlayers().forEach(
        (p) => (p.cash = p.cash + newMission.reward)
      );
    } else {
      this.currentMission = null;
    }
  };
}

export default new MissionController();
