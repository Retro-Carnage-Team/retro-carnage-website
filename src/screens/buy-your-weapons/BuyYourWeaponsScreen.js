import React from 'react';
import { Helmet } from 'react-helmet';
import './BuyYourWeaponsScreen.css';
import Ammunition from '../../game/Ammunition';
import Grenades from '../../game/Grenades';
import Weapons from '../../game/Weapons';

class BuyYourWeaponsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullText: `Buy your weapons player ${props.player + 1}`,
      height: 100,
      images: Weapons.map((w) => w.image).concat(Grenades.map((g) => g.image), Ammunition.map((a) => a.image)),
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
  }

  render() {
    const links = this.state.images.map((image) => (<link key={ image } rel="preload" href={ image } />));
    return (
      <div className="buy-your-weapons-screen">
        <div style={{ height: `${this.state.height}px` }} />
        <h1>{ this.state.text }</h1>
        <Helmet>{ links }</Helmet>
      </div>
    );
  }

}

export default BuyYourWeaponsScreen;