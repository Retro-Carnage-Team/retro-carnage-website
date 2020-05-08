import MissionController from './MissionController';
import Missions from './Missions';
import Players from './Player';

test('All missions should be available when game gets reset', () => {
  MissionController.reset();
  expect(MissionController.getRemainingMissions().length).toBe(Missions.length);
});


test('Missions should get filtered when marked as finished', () => {
  MissionController.reset();
  MissionController.markMissionFinished(Missions[0].name);
  expect(MissionController.getRemainingMissions().length).toBe(Missions.length -1);
});


test('Selecting a mission should update property and cash in inventory', () => {
  MissionController.reset();
  const missionName = 'Minsk';
  const oldCash = Players[0].cash;
  MissionController.selectMission(missionName);
  expect(MissionController.currentMission.name).toBe(missionName);
  expect(Players[0].cash).toBeGreaterThan(oldCash);
});
