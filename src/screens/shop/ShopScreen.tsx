import React from "react";

import { Ammunition, Ammunitions } from "../../game/Ammunition";
import { Grenade, Grenades } from "../../game/Grenades";
import { Weapon, Weapons } from "../../game/Weapons";
import ChangeListener from "../../game/ChangeListener";
import { Players } from "../../game/Player";
import BottomLine from "./BottomLine";
import ItemAmmunition from "./ItemAmmunition";
import ItemGrenade from "./ItemGrenade";
import ItemWeapon from "./ItemWeapon";
import DetailAmmunition from "./DetailAmmunition";
import DetailGrenade from "./DetailGrenade";
import DetailWeapon from "./DetailWeapon";

import styles from "./ShopScreen.module.css";

export interface ShopScreenProps {
  onScreenChangeRequired: () => void;
  player: number;
}

export interface ShopScreenState {
  selectedAmmunition: Ammunition | null;
  selectedGrenade: Grenade | null;
  selectedWeapon: Weapon | null;
}

class ShopScreen extends React.Component<ShopScreenProps, ShopScreenState> {
  changeListener: ChangeListener<any>;

  constructor(props: ShopScreenProps) {
    super(props);
    this.changeListener = new ChangeListener(this.handleInventoryUpdate);
    this.state = {
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: null,
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
      Ammunitions.map((a) => this.buildAmmunitionItem(a))
    );

    let detail: JSX.Element | undefined;
    if (!!this.state.selectedAmmunition) {
      detail = <DetailAmmunition ammunition={this.state.selectedAmmunition} />;
    } else if (!!this.state.selectedGrenade) {
      detail = <DetailGrenade grenade={this.state.selectedGrenade} />;
    } else if (!!this.state.selectedWeapon) {
      detail = <DetailWeapon weapon={this.state.selectedWeapon} />;
    }

    return (
      <div className={styles.screen}>
        <div className={styles.catalog}>{items}</div>
        <div className={styles.details}>{detail}</div>
        <BottomLine
          player={Players[this.props.player]}
          onExit={this.handleExitClicked}
          selectedAmmunition={this.state.selectedAmmunition}
          selectedGrenade={this.state.selectedGrenade}
          selectedWeapon={this.state.selectedWeapon}
        />
      </div>
    );
  }

  handleInventoryUpdate = () => {
    this.forceUpdate();
  };

  buildAmmunitionItem = (ammo: Ammunition) => {
    return (
      <ItemAmmunition
        ammunition={ammo}
        key={ammo.name}
        onMouseEnter={this.handleItemAmmunitionMouseEnter}
        onMouseLeave={this.handleItemMouseLeave}
        player={this.props.player}
        selectedWeapon={this.state.selectedWeapon}
      />
    );
  };

  buildGrenadeItem = (grenade: Grenade) => {
    return (
      <ItemGrenade
        key={grenade.name}
        grenade={grenade}
        onMouseEnter={this.handleItemGrenadeMouseEnter}
        onMouseLeave={this.handleItemMouseLeave}
        player={this.props.player}
      />
    );
  };

  buildWeaponItem = (weapon: Weapon) => {
    return (
      <ItemWeapon
        key={weapon.name}
        onMouseEnter={this.handleItemWeaponMouseEnter}
        onMouseLeave={this.handleItemMouseLeave}
        player={this.props.player}
        selectedAmmunition={this.state.selectedAmmunition}
        weapon={weapon}
      />
    );
  };

  handleItemAmmunitionMouseEnter = (ammunition: Ammunition) => {
    this.setState({
      selectedAmmunition: ammunition,
      selectedGrenade: null,
      selectedWeapon: null,
    });
  };

  handleItemGrenadeMouseEnter = (grenade: Grenade) => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: grenade,
      selectedWeapon: null,
    });
  };

  handleItemWeaponMouseEnter = (weapon: Weapon) => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: weapon,
    });
  };

  handleItemMouseLeave = () => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: null,
    });
  };

  handleExitClicked = () => {
    Players[this.props.player].selectFirstWeapon();
    this.props.onScreenChangeRequired();
  };
}

export default ShopScreen;
