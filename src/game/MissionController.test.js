import MissionController from './MissionController';
import Missions from './Missions';

test('All missions should be available when game gets reset', () => {
  MissionController.reset();
  expect(MissionController.getRemainingMissions().length).toBe(Missions.length);
});

test('Missions should get filtered when marked as finished', () => {
  MissionController.reset();

  MissionController.markMissionFinished(Missions[0].name);
  expect(MissionController.getRemainingMissions().length).toBe(Missions.length -1);
});

test('Selected mission can be set and reset', () => {
  MissionController.reset();

  const missionName = 'TEST123';

  MissionController.selectedMission = missionName;
  expect(MissionController.selectedMission).toBe(missionName);
});