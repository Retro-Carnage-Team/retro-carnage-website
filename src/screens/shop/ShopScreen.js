import React from 'react';
import './ShopScreen.css';
import Ammunition from '../../game/Ammunition';
import Grenades from '../../game/Grenades';
import Weapons from '../../game/Weapons';
import ItemAmmunition from './ItemAmmunition';
import ItemGrenade from './ItemGrenade';
import ItemWeapon from './ItemWeapon';

class ShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  };
  }  

  render() {
    const items = Weapons.map(w => (<ItemWeapon key={ w.name }  weapon={ w }></ItemWeapon>)).concat(
      Grenades.map(g => (<ItemGrenade key={ g.name } grenade={ g }></ItemGrenade>)),
      Ammunition.map(a => (<ItemAmmunition key={ a.name } ammunition={ a }></ItemAmmunition>))
    );

    return (
      <div className="shop-screen">
        <div className="catalog">
          { items }
        </div>
        <div className="details">

        </div>
        <div className="bottom-line">

        </div>
      </div>
    );
  }

}

export const SHOP_SCREEN_NAME = "shop";
export default ShopScreen;