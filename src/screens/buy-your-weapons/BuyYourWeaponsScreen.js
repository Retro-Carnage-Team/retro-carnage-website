import React from 'react';

import Ammunition from '../../game/Ammunition';
import Grenades from '../../game/Grenades';
import Weapons from '../../game/Weapons';

import styles from './BuyYourWeaponsScreen.module.css';

class BuyYourWeaponsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullText: `Buy your weapons player ${props.player + 1}`,
      height: 100,
      text: ''
    };
    this.animationIntervalId = null;
  }

  componentDidMount() {
    this.setState({ height: window.innerHeight / 2 - 40});
    this.animationIntervalId = setInterval(() => { 
      if(this.state.text.length === this.state.fullText.length) {
        clearInterval(this.animationIntervalId);
        setTimeout(() => { this.props.onScreenChangeRequired(); }, 500);
      } else {
        this.setState({ text: this.state.fullText.substring(0, this.state.text.length +1) });
      }
    }, 120);
    this.preloadImagesForShop();
  }

  render() {
    return (
      <div className={ styles.screen }>
        <div style={{ height: `${this.state.height}px` }} />
        <h1>{ this.state.text }</h1>
      </div>
    );
  }

  preloadImagesForShop = () => {
    Weapons.map((w) => w.image)
      .concat(Grenades.map((g) => g.image), Ammunition.map((a) => a.image))
      .forEach((i) => {
        const image = new Image(300, 110);
        image.src = i;
        image.loading = 'eager';
      });
  }

}

export default BuyYourWeaponsScreen;