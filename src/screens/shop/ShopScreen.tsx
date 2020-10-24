import React from "react";
import cn from "classnames";

import { Ammunition, Ammunitions } from "../../game/Ammunition";
import { Grenade, Grenades } from "../../game/Grenades";
import { Weapon, Weapons } from "../../game/Weapons";
import ChangeListener from "../../game/ChangeListener";
import { Players } from "../../game/Player";
import BottomLine from "./BottomLine";
import InventoryController from "../../game/InventoryController";
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
  modalVisible: boolean;
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
      modalVisible: false,
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

    const price =
      this.state.selectedAmmunition?.price ||
      this.state.selectedGrenade?.price ||
      this.state.selectedWeapon?.price;
    const count =
      this.state.selectedGrenade?.packageSize ||
      this.state.selectedAmmunition?.packageSize;

    const buttonBuySelectedItem = this.canBuySelectedItem() ? (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.buySelectedItem}
      >
        Buy {count} for $ {price}
      </button>
    ) : undefined;

    let buttonBuyAmmo = undefined;
    if (this.canBuyAmmoForSelectedWeapon()) {
      const ammo = Ammunitions.find(
        (a) => a.name === this.state.selectedWeapon?.ammo
      );
      buttonBuyAmmo = (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            InventoryController.buyAmmunition(this.props.player, ammo!.name)
          }
        >
          Buy {ammo!.packageSize} for $ {ammo!.price}
        </button>
      );
    }

    return (
      <div className={styles.screen}>
        <div className={styles.catalog}>{items}</div>
        <BottomLine
          player={Players[this.props.player]}
          onExit={this.handleExitClicked}
          selectedAmmunition={this.state.selectedAmmunition}
          selectedGrenade={this.state.selectedGrenade}
          selectedWeapon={this.state.selectedWeapon}
        />
        <div
          className={cn(
            "modal",
            this.state.modalVisible ? styles.modalVisible : null
          )}
          tabIndex={-1}
          role="dialog"
        >
          <div className={cn("modal-dialog", styles.wide)} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {this.state.selectedAmmunition?.name}
                  {this.state.selectedGrenade?.name}
                  {this.state.selectedWeapon?.name}
                </h3>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{detail}</div>
              <div className="modal-footer">
                {buttonBuySelectedItem}
                {buttonBuyAmmo}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  buySelectedItem = () => {
    if (this.state.selectedWeapon) {
      InventoryController.buyWeapon(
        this.props.player,
        this.state.selectedWeapon.name
      );
    } else if (this.state.selectedGrenade) {
      InventoryController.buyGrenade(
        this.props.player,
        this.state.selectedGrenade.name
      );
    } else if (this.state.selectedAmmunition) {
      InventoryController.buyAmmunition(
        this.props.player,
        this.state.selectedAmmunition.name
      );
    }
  };

  canBuyAmmoForSelectedWeapon = (): boolean => {
    return (
      !!this.state.selectedWeapon &&
      InventoryController.isAmmunitionProcurable(
        this.props.player,
        this.state.selectedWeapon.ammo
      )
    );
  };

  canBuySelectedItem = (): boolean => {
    if (this.state.selectedWeapon) {
      return InventoryController.isWeaponProcurable(
        this.props.player,
        this.state.selectedWeapon.name
      );
    }
    if (this.state.selectedGrenade) {
      return InventoryController.isGrenadeProcurable(
        this.props.player,
        this.state.selectedGrenade.name
      );
    }
    if (this.state.selectedAmmunition) {
      return InventoryController.isAmmunitionProcurable(
        this.props.player,
        this.state.selectedAmmunition.name
      );
    }
    return false;
  };

  handleInventoryUpdate = () => {
    this.forceUpdate();
  };

  buildAmmunitionItem = (ammo: Ammunition) => {
    return (
      <ItemAmmunition
        ammunition={ammo}
        key={ammo.name}
        onClick={(ammunition) => {
          this.handleItemAmmunitionSelected(ammunition);
          this.setState({ modalVisible: true });
        }}
        player={this.props.player}
        selected={ammo.name === this.state.selectedAmmunition?.name}
      />
    );
  };

  buildGrenadeItem = (grenade: Grenade) => {
    return (
      <ItemGrenade
        key={grenade.name}
        grenade={grenade}
        onClick={(grenade) => {
          this.handleItemGrenadeSelected(grenade);
          this.setState({ modalVisible: true });
        }}
        selected={grenade.name === this.state.selectedGrenade?.name}
        player={this.props.player}
      />
    );
  };

  buildWeaponItem = (weapon: Weapon) => {
    return (
      <ItemWeapon
        key={weapon.name}
        onClick={(weapon) => {
          this.handleItemWeaponSelected(weapon);
          this.setState({ modalVisible: true });
        }}
        player={this.props.player}
        selected={weapon.name === this.state.selectedWeapon?.name}
        weapon={weapon}
      />
    );
  };

  handleItemAmmunitionSelected = (ammunition: Ammunition) => {
    this.setState({
      selectedAmmunition: ammunition,
      selectedGrenade: null,
      selectedWeapon: null,
    });
  };

  handleItemGrenadeSelected = (grenade: Grenade) => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: grenade,
      selectedWeapon: null,
    });
  };

  handleItemWeaponSelected = (weapon: Weapon) => {
    this.setState({
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon: weapon,
    });
  };

  handleExitClicked = () => {
    Players[this.props.player].selectFirstWeapon();
    this.props.onScreenChangeRequired();
  };
}

export default ShopScreen;
