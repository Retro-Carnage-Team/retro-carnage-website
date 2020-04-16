import React from 'react';
import './TitleScreen.css';
import { MAP_SCREEN_NAME } from '../map/MapScreen';
import SoundBoard, { FX_TITLE_RIFLE, MUSIC_THEME } from '../../game/SoundBoard';

const BACKGROUND_WIDTH = 1280;
const BACKGROUND_HEIGHT = 720;
const ANIMATION_LENGTH = 2500;
const MUZZLE_LEFT = 814;
const MUZZLE_TOP = 457;

class TitleScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      imageSize: '100',
      muzzleFlash: false,
      scalingFactor: 1.0
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    setTimeout(() => { 
      document.getElementById("title-bg").src = "images/backgrounds/title-2.jpg";
    }, 500);
    setTimeout(() => { 
      SoundBoard.play(FX_TITLE_RIFLE);
      this.setState({muzzleFlash: true});
    }, 1500);

    setTimeout(() => { 
      this.setState({muzzleFlash: false});
      document.getElementById("title-bg").src = "images/backgrounds/title-1.jpg";
    }, 1500 + ANIMATION_LENGTH);

    setTimeout(() => { 
      SoundBoard.play(MUSIC_THEME);
    }, 5500);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="title-screen" onClick={ this.moveToNextScreen }>
        <img 
          id="title-bg" 
          src="images/backgrounds/title-1.jpg" 
          alt=""
          style={{width: this.state.imageSize + 'px'}}></img>
        <img 
          id="muzzle-flash"
          src="images/backgrounds/muzzle.gif"
          alt="muzzle flash"
          style={{ 
            display: (this.state.muzzleFlash ? 'inherit' : 'none'),
            left: (this.state.scalingFactor * MUZZLE_LEFT + (window.innerWidth - this.state.imageSize) / 2) + 'px',
            top: (this.state.scalingFactor * MUZZLE_TOP - 64) + 'px',
          }}></img>
      </div>
    );
  }

  updateDimensions = () => {
    const widthFactor = window.innerWidth / BACKGROUND_WIDTH;
    if(BACKGROUND_HEIGHT * widthFactor > window.innerHeight) {
      const heightFactor = window.innerHeight / BACKGROUND_HEIGHT;
      this.setState({ 
        imageSize: (BACKGROUND_WIDTH * heightFactor),
        scalingFactor: heightFactor
      });
    } else {
      this.setState({ 
        imageSize: window.innerWidth,
        scalingFactor: widthFactor
      });
    }
  }

  moveToNextScreen = () => {
    this.props.onScreenChangeRequired(MAP_SCREEN_NAME);
  }

}

export const TITLE_SCREEN_NAME = "title";
export default TitleScreen;