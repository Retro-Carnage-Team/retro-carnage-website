import React from "react";

import ChangeListener from "../../game/ChangeListener";
import { Directions } from "../../game/engine/Directions";
import GamepadLocationMarker from "./GamepadLocationMarker";
import InputController, {
  PROP_BUTTON,
  PROP_DIRECTION,
} from "../../game/InputController";
import MissionBriefing from "./MissionBriefing";
import MissionController, {
  NavigatableMission,
} from "../../game/MissionController";
import { SHOPPING_FLOW_NAME } from "../shopping-flow/ShoppingFlow";

import styles from "./MapScreen.module.css";
import { Location, Mission } from "../../game/Missions";

const WORLD_MAP_WIDTH = 1280;
const WORLD_MAP_HEIGHT = 783;

export interface MapScreenProps {
  onScreenChangeRequired: (screenName: string) => void;
}

export interface MapScreenState {
  imageSize: number;
  scalingFactor: number;
  selectedMission: string | null;
}

interface MissionExtract {
  location: Location;
  name: string;
}

class MapScreen extends React.Component<MapScreenProps, MapScreenState> {
  inputControllerListener: ChangeListener<any>;
  missions: MissionExtract[];

  constructor(props: MapScreenProps) {
    super(props);
    this.state = {
      imageSize: 100,
      scalingFactor: 1.0,
      selectedMission: null,
    };
    this.missions = MissionController.getRemainingMissions().map((l) => ({
      location: l.location,
      name: l.name,
    }));
    this.inputControllerListener = new ChangeListener(
      this.handleInputControllerInput
    );
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    InputController.startGuiMode();
    InputController.addChangeListener(this.inputControllerListener);
    if (InputController.isSecondPlayerPossible()) {
      this.setState({ selectedMission: "Berlin" });
    }
  }

  componentWillUnmount() {
    InputController.removeChangeListener(this.inputControllerListener);
    InputController.stopGuiMode();
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const widthOfGamepadPositionMarker = 48;
    const widthOfPositionMarker = 18;
    const spots = this.missions.map((m) => (
      <div
        className={styles.locationContainer}
        key={m.name}
        onClick={this.handleMissionSelected.bind(this, m.name)}
        onMouseEnter={this.handleMissionMouseEnter.bind(this, m.name)}
        onMouseLeave={this.handleMissionMouseLeave}
        style={{
          left:
            (window.innerWidth - this.state.imageSize) / 2 +
            m.location.longitude * this.state.scalingFactor -
            widthOfPositionMarker / 2,
          top:
            m.location.latitude * this.state.scalingFactor -
            widthOfPositionMarker / 2,
        }}
      >
        <div className={styles.locationMarker} />
      </div>
    ));

    const locationMarker = this.missions
      .filter((m) => m.name === this.state.selectedMission)
      .map((m) => (
        <GamepadLocationMarker
          className={styles.gamepadLocationMarker}
          key="gamepad-location-marker"
          style={{
            left:
              (window.innerWidth - this.state.imageSize) / 2 +
              m.location.longitude * this.state.scalingFactor -
              widthOfGamepadPositionMarker / 2,
            top:
              m.location.latitude * this.state.scalingFactor -
              widthOfGamepadPositionMarker,
          }}
        />
      ));

    return (
      <div className={styles.screen}>
        <div className={styles.briefingContainer}>
          <MissionBriefing mission={this.state.selectedMission || ""} />
        </div>
        <div className={styles.worldMapContainer}>
          <img
            style={{ width: this.state.imageSize + "px" }}
            src="images/backgrounds/world-map.jpg"
            alt=""
          />
          {spots}
          {locationMarker}
        </div>
      </div>
    );
  }

  handleMissionMouseEnter = (missionName: string) => {
    this.setState({ selectedMission: missionName });
  };

  handleMissionMouseLeave = () => {
    this.setState({ selectedMission: null });
  };

  handleMissionSelected = (missionName: string) => {
    MissionController.selectMission(missionName);
    this.props.onScreenChangeRequired(SHOPPING_FLOW_NAME);
  };

  updateDimensions = () => {
    const availableWidth = window.innerWidth - 100;
    const widthFactor = availableWidth / WORLD_MAP_WIDTH;
    const availableHeight = (window.innerHeight * 3) / 4;
    if (WORLD_MAP_HEIGHT * widthFactor > availableHeight) {
      const heightFactor = availableHeight / WORLD_MAP_HEIGHT;
      this.setState({
        imageSize: WORLD_MAP_WIDTH * heightFactor,
        scalingFactor: heightFactor,
      });
    } else {
      this.setState({
        imageSize: availableWidth,
        scalingFactor: widthFactor,
      });
    }
  };

  handleInputControllerInput = (value: string, property: string) => {
    if (PROP_BUTTON === property && this.state.selectedMission) {
      this.handleMissionSelected(this.state.selectedMission);
    }

    if (PROP_DIRECTION === property) {
      const missionResolver = new Map<
        string,
        (mission: NavigatableMission) => Mission | undefined
      >();
      missionResolver.set(Directions.Up, MissionController.getNextMissionNorth);
      missionResolver.set(
        Directions.Down,
        MissionController.getNextMissionSouth
      );
      missionResolver.set(
        Directions.Left,
        MissionController.getNextMissionWest
      );
      missionResolver.set(
        Directions.Right,
        MissionController.getNextMissionEast
      );
      if (missionResolver.get(value)) {
        const selectionName =
          this.state.selectedMission || this.missions[0].name;
        const currentMission = this.missions.find(
          (m) => m.name === selectionName
        );
        const resolver = missionResolver.get(value);
        if (resolver && currentMission) {
          const nextMission = resolver(currentMission);
          if (nextMission) {
            this.setState({ selectedMission: nextMission.name });
          }
        }
      }
    }
  };
}

export const MAP_SCREEN_NAME = "map";
export default MapScreen;
