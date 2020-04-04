import React from 'react';
import './ShopScreen.css';
import Ammunition from '../../game/Ammunition';
import Grenades from '../../game/Grenades';
import Weapons from '../../game/Weapons';
import ItemAmmunition from './ItemAmmunition';
import ItemGrenade from './ItemGrenade';
import ItemWeapon from './ItemWeapon';
import DetailWeapon from './DetailWeapon';

class ShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: null
    };
  }  

  render() {
    const items = Weapons.map(w => this.buildWeaponItem(w)).concat(
      Grenades.map(g => this.buildGrenadeItem(g)),
      Ammunition.map(a => this.buildAmmunitionItem(a))
    );

    let detail = undefined;
    if(!!this.state.selectedWeapon) {
      detail = <DetailWeapon weapon={ this.state.selectedWeapon } />
    }

    return (
      <div className="shop-screen">
        <div className="catalog">
          { items }
        </div>
        <div className="details">
          { detail }
        </div>
        <div className="bottom-line">

        </div>
      </div>
    );
  }

  buildAmmunitionItem = (ammo) => {
    return (
      <ItemAmmunition 
        ammunition={ ammo }
        key={ ammo.name } 
        onMouseEnter={ this.handleItemAmmunitionMouseEnter } />
    );
  }

  buildGrenadeItem = (grenade) => {
    return (
      <ItemGrenade 
        key={ grenade.name } 
        grenade={ grenade }
        onMouseEnter={ this.handleItemGrenadeMouseEnter } />
    );
  }

  buildWeaponItem = (weapon) => {
    return (
      <ItemWeapon 
        key={ weapon.name } 
        onMouseEnter={ this.handleItemWeaponMouseEnter }
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
    console.log("handleItemWeaponMouseEnter", weapon);
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: weapon
    });
  }  

}

export const SHOP_SCREEN_NAME = "shop";
export default ShopScreen;