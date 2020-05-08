import React from 'react';
import './ShopScreen.css';
import Ammunition from '../../game/Ammunition';
import Grenades from '../../game/Grenades';
import Weapons from '../../game/Weapons';
import ChangeListener from '../../game/ChangeListener';
import Players from '../../game/Player';
import BottomLine from './BottomLine';
import ItemAmmunition from './ItemAmmunition';
import ItemGrenade from './ItemGrenade';
import ItemWeapon from './ItemWeapon';
import DetailAmmunition from './DetailAmmunition';
import DetailGrenade from './DetailGrenade';
import DetailWeapon from './DetailWeapon';

class ShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.changeListener = new ChangeListener(this.handleInventoryUpdate);
    this.state = {
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: null
    };
  }

  componentDidMount() {
    Players[this.props.player].addChangeListener(this.changeListener);
  }
  
  componentWillUnmount() {
    Players[this.props.player].removeChangeListener(this.changeListener);
  }

  render() {
    const items = Weapons.map((w) => this.buildWeaponItem(w)).concat(
      Grenades.map((g) => this.buildGrenadeItem(g)),
      Ammunition.map((a) => this.buildAmmunitionItem(a))
    );

    let detail = void 0;
    if(!!this.state.selectedAmmunition) {
      detail = <DetailAmmunition ammunition={ this.state.selectedAmmunition } />;
    } else if (!!this.state.selectedGrenade) {
      detail = <DetailGrenade grenade={ this.state.selectedGrenade } />;
    } else if(!!this.state.selectedWeapon) {
      detail = <DetailWeapon weapon={ this.state.selectedWeapon } />;
    }

    return (
      <div className="shop-screen">
        <div className="catalog">
          { items }
        </div>
        <div className="details">
          { detail }
        </div>
        <BottomLine
          player={ Players[this.props.player] }
          onExit={ this.handleExitClicked }
          selectedAmmunition={ this.state.selectedAmmunition }
          selectedGrenade={ this.state.selectedGrenade }
          selectedWeapon={ this.state.selectedWeapon } />
      </div>
    );
  }

  handleInventoryUpdate = () => {
    this.forceUpdate();
  }

  buildAmmunitionItem = (ammo) => {
    return (
      <ItemAmmunition 
        ammunition={ ammo }
        key={ ammo.name }
        onMouseEnter={ this.handleItemAmmunitionMouseEnter }
        onMouseLeave={ this.handleItemMouseLeave }
        player={ this.props.player }
        selectedWeapon={ this.state.selectedWeapon } />
    );
  }

  buildGrenadeItem = (grenade) => {
    return (
      <ItemGrenade 
        key={ grenade.name } 
        grenade={ grenade }
        onMouseEnter={ this.handleItemGrenadeMouseEnter } 
        onMouseLeave={ this.handleItemMouseLeave }
        player={ this.props.player } />
    );
  }

  buildWeaponItem = (weapon) => {
    return (
      <ItemWeapon 
        key={ weapon.name }
        onMouseEnter={ this.handleItemWeaponMouseEnter }
        onMouseLeave={ this.handleItemMouseLeave }
        player={ this.props.player }
        selectedAmmunition={ this.state.selectedAmmunition }
        weapon={ weapon } />
    );
  }

  handleItemAmmunitionMouseEnter = (ammunition) => {    
    this.setState({
      selectedAmmunition: ammunition,
      selectedGrenade: null,
      selectedWeapon: null
    });
  }

  handleItemGrenadeMouseEnter = (grenade) => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: grenade,
      selectedWeapon: null
    });
  }

  handleItemWeaponMouseEnter = (weapon) => {    
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: weapon
    });
  }

  handleItemMouseLeave = () => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: null
    });
  }

  handleExitClicked = () => {
    Players[this.props.player].selectFirstWeapon();
    this.props.onScreenChangeRequired();
  }

}

export default ShopScreen;
