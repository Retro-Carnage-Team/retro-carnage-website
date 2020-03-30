import React from 'react';
import './MapScreen.css';
import MissionBriefing from './MissionBriefing';

const WORLD_MAP_WIDTH = 1280;
const WORLD_MAP_HEIGHT = 783;

class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      imageSize: '100%',
      scalingFactor: 1.0,
      selectedMission: null
    };
  }

  updateDimensions = () => {
    const availableWidth = window.innerWidth - 100;
    const widthFactor = availableWidth / WORLD_MAP_WIDTH;
    const availableHeight = window.innerHeight * 3 / 4;
    if(WORLD_MAP_HEIGHT * widthFactor > availableHeight) {
      const heightFactor = availableHeight / WORLD_MAP_HEIGHT;
      this.setState({ 
        imageSize: (WORLD_MAP_WIDTH * heightFactor) + "px",
        scalingFactor: heightFactor
      });
    } else {
      this.setState({ 
        imageSize: availableWidth + "px",
        scalingFactor: widthFactor
      });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="map-screen">
        <div className="briefing-container">
          <MissionBriefing mission={ this.selectedMission }/>
        </div>        
        <div className="world-map-container">
          <img style={{width: this.state.imageSize}} src="images/backgrounds/world-map.jpg" alt=""></img>
        </div>
      </div>
    );
  }

}

export const MAP_SCREEN_NAME = "map";
export default MapScreen;