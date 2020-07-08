import MissionController from './MissionController';
import Missions from './Missions';
import {Players} from './Player';

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
  expect(MissionController.currentMission?.name).toBe(missionName);
  expect(Players[0].cash).toBeGreaterThan(oldCash);
});

test('Should be able to find mission north to given mission', () => {
  MissionController.reset();
  const berlin = Missions.find((m) => m.name === 'Berlin');
  expect(berlin).toBeDefined();
  const result = MissionController.getNextMissionNorth(berlin!);
  expect(result?.name).toBe('Minsk');
});

test('Should return falsy value if it cannot find any mission north to given mission', () => {
  MissionController.reset();
  const minsk = Missions.find((m) => m.name === 'Minsk');
  expect(minsk).toBeDefined();
  const result = MissionController.getNextMissionNorth(minsk!);
  expect(result).toBeUndefined();
});

test('Should be able to find mission south to given mission', () => {
  MissionController.reset();
  const berlin = Missions.find((m) => m.name === 'Berlin');
  expect(berlin).toBeDefined();
  const result = MissionController.getNextMissionSouth(berlin!);
  expect(result?.name).toBe('Bischkek');
});

test('Should return falsy value if it cannot find any mission south to given mission', () => {
  MissionController.reset();
  const amazonas = Missions.find((m) => m.name === 'Amazonas');
  expect(amazonas).toBeDefined();
  const result = MissionController.getNextMissionSouth(amazonas!);
  expect(result).toBeUndefined();
});

test('Should be able to find mission east to given mission', () => {
  MissionController.reset();
  const berlin = Missions.find((m) => m.name === 'Berlin');
  expect(berlin).toBeDefined();
  const result = MissionController.getNextMissionEast(berlin!);
  expect(result?.name).toBe('Tripolis');
});

test('Should return falsy value if it cannot find any mission east to given mission', () => {
  MissionController.reset();
  const vietnam = Missions.find((m) => m.name === 'Ho-Chi-Minh City');
  expect(vietnam).toBeDefined();
  const result = MissionController.getNextMissionEast(vietnam!);
  expect(result).toBeUndefined();
});

test('Should be able to find mission west to given mission', () => {
  MissionController.reset();
  const berlin = Missions.find((m) => m.name === 'Berlin');
  expect(berlin).toBeDefined();
  const result = MissionController.getNextMissionWest(berlin!);
  expect(result?.name).toBe('Amazonas');
});

test('Should return falsy value if it cannot find any mission west to given mission', () => {
  MissionController.reset();
  const mexico = Missions.find((m) => m.name === 'Mexico City');
  expect(mexico).toBeDefined();
  const result = MissionController.getNextMissionWest(mexico!);
  expect(result).toBeUndefined();
});
