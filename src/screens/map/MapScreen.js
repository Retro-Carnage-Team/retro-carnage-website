import React from 'react';
import './MapScreen.css';
import MissionBriefing from './MissionBriefing';
import MissionController from '../../game/MissionController';

import { SHOP_SCREEN_NAME } from '../shop/ShopScreen';

const WORLD_MAP_WIDTH = 1280;
const WORLD_MAP_HEIGHT = 783;

class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      imageSize: '100',      
      scalingFactor: 1.0,
      selectedMission: null
    };
    this.missions = MissionController.getRemainingMissions().map(l => ({ 
      location: l.location,
      name: l.name
    }))
  }  

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const widthOfPositionMarker = 18;
    const spots = this.missions.map(m => (
      <div 
        className="location-container" 
        key={ m.name } 
        onClick={ this.handleMissionSelected.bind(this, m.name) }
        onMouseEnter={ this.handleMissionMouseEnter.bind(this, m.name) }
        onMouseLeave={ this.handleMissionMouseLeave } 
        style={{ 
        left: ((window.innerWidth - this.state.imageSize) / 2) + (m.location.longitude * this.state.scalingFactor) -(widthOfPositionMarker / 2),
        top: (m.location.latitude * this.state.scalingFactor) -(widthOfPositionMarker / 2)
      }}>
        <div className="location-marker" />
      </div>      
    )); 
    return (
      <div className="map-screen">
        <div className="briefing-container">
          <MissionBriefing mission={ this.state.selectedMission }/>
        </div>        
        <div className="world-map-container">
          <img style={{width: this.state.imageSize + 'px'}} src="images/backgrounds/world-map.jpg" alt=""></img>
          { spots }
        </div>
      </div>
    );
  }

  handleMissionMouseEnter = (missionName) => {
    this.setState({ selectedMission: missionName });
  }

  handleMissionMouseLeave = () => {
    this.setState({ selectedMission: null });
  }

  handleMissionSelected = (missionName) => {
    MissionController.setSelectedMission(missionName);
    this.props.onScreenChangeRequired(SHOP_SCREEN_NAME);
  }

  updateDimensions = () => {
    const availableWidth = window.innerWidth - 100;
    const widthFactor = availableWidth / WORLD_MAP_WIDTH;
    const availableHeight = window.innerHeight * 3 / 4;
    if(WORLD_MAP_HEIGHT * widthFactor > availableHeight) {
      const heightFactor = availableHeight / WORLD_MAP_HEIGHT;
      this.setState({ 
        imageSize: (WORLD_MAP_WIDTH * heightFactor),
        scalingFactor: heightFactor
      });
    } else {
      this.setState({ 
        imageSize: availableWidth,
        scalingFactor: widthFactor
      });
    }
  }

}

export const MAP_SCREEN_NAME = "map";
export default MapScreen;