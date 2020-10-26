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
import InputController, {
  CONTROLLER_STATUS_GAMEPAD,
  PROP_BUTTON,
  PROP_DIRECTION,
} from "../../game/InputController";

import styles from "./ShopScreen.module.css";
import { Directions } from "../../game/Directions";

enum ModalButtons {
  BuyItem,
  BuyAmmo,
  Close,
}

export interface ShopScreenProps {
  onScreenChangeRequired: () => void;
  player: number;
}

export interface ShopScreenState {
  selectedAmmunition: Ammunition | null;
  selectedGrenade: Grenade | null;
  selectedWeapon: Weapon | null;
  modalVisible: boolean;
  selectedModalButton: ModalButtons | null;
}

class ShopScreen extends React.Component<ShopScreenProps, ShopScreenState> {
  changeListener: ChangeListener<any>;
  inputControllerListener: ChangeListener<any>;
  uiElements: (() => void)[];

  constructor(props: ShopScreenProps) {
    super(props);
    this.changeListener = new ChangeListener(this.handleInventoryUpdate);
    this.state = {
      selectedAmmunition: null,
      selectedGrenade: null,
      selectedWeapon:
        CONTROLLER_STATUS_GAMEPAD ===
        InputController.getControllerStatus()[props.player]
          ? Weapons[0]
          : null,
      modalVisible: false,
      selectedModalButton: ModalButtons.BuyItem,
    };
    this.inputControllerListener = new ChangeListener(
      this.handleInputControllerInput
    );

    this.uiElements = Weapons.map((weapon) => () =>
      this.handleItemWeaponSelected(weapon)
    )
      .concat(
        Grenades.map((grenade) => () => this.handleItemGrenadeSelected(grenade))
      )
      .concat(
        Ammunitions.map((ammo) => () => this.handleItemAmmunitionSelected(ammo))
      );
  }

  componentDidMount() {
    Players[this.props.player].addChangeListener(this.changeListener);
    InputController.startGuiMode();
    InputController.addChangeListener(this.inputControllerListener);
  }

  componentWillUnmount() {
    Players[this.props.player].removeChangeListener(this.changeListener);
    InputController.removeChangeListener(this.inputControllerListener);
    InputController.stopGuiMode();
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
      <div
        className={cn(
          this.state.selectedModalButton === ModalButtons.BuyItem
            ? styles.modalButtonSelected
            : styles.modalButton
        )}
        onClick={this.buySelectedItem}
      >
        Buy {count} for $ {price}
      </div>
    ) : undefined;

    let buttonBuyAmmo = undefined;
    if (this.canBuyAmmoForSelectedWeapon()) {
      const ammo = Ammunitions.find(
        (a) => a.name === this.state.selectedWeapon?.ammo
      );
      buttonBuyAmmo = (
        <div
          className={cn(
            this.state.selectedModalButton === ModalButtons.BuyAmmo
              ? styles.modalButtonSelected
              : styles.modalButton
          )}
          onClick={this.buyAmmoForSelectedWeapon}
        >
          Buy {ammo!.packageSize} for $ {ammo!.price}
        </div>
      );
    }

    let bullets = 0;
    let maxBullets = 0;
    if (this.state.selectedWeapon) {
      const ammo = Ammunitions.find(
        (a) => a.name === this.state.selectedWeapon?.ammo
      );
      if (ammo) {
        bullets = InventoryController.getAmmunitionCount(
          this.props.player,
          ammo.name
        );
        maxBullets = ammo.maxCount;
      }
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
              <div className={cn("modal-header", styles.dialogHeader)}>
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
              <div className={cn("modal-footer", styles.dialogFooter)}>
                <span
                  className={cn(
                    this.state.selectedWeapon &&
                      InventoryController.isWeaponInInventory(
                        this.props.player,
                        this.state.selectedWeapon.name
                      )
                      ? styles.inPossession
                      : styles.notInPossession
                  )}
                >
                  You own this weapon and {bullets} of {maxBullets} bullets.
                </span>

                <div
                  className={cn(
                    this.state.selectedModalButton === ModalButtons.Close
                      ? styles.modalButtonSelected
                      : styles.modalButton
                  )}
                  onClick={this.closeModal}
                >
                  Close
                </div>
                {buttonBuyAmmo}
                {buttonBuySelectedItem}
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
      this.setState({
        selectedModalButton: this.canBuyAmmoForSelectedWeapon()
          ? ModalButtons.BuyAmmo
          : ModalButtons.Close,
      });
    } else {
      if (this.state.selectedGrenade) {
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
      this.setState({
        selectedModalButton: this.canBuySelectedItem()
          ? ModalButtons.BuyItem
          : ModalButtons.Close,
      });
    }
  };

  buyAmmoForSelectedWeapon = () => {
    const ammo = Ammunitions.find(
      (a) => a.name === this.state.selectedWeapon?.ammo
    );
    if (ammo) {
      InventoryController.buyAmmunition(this.props.player, ammo.name);
    }
    if (!this.canBuyAmmoForSelectedWeapon()) {
      this.setState({ selectedModalButton: ModalButtons.Close });
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

  buildAmmunitionItem = (ammo: Ammunition): JSX.Element => {
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

  buildGrenadeItem = (grenade: Grenade): JSX.Element => {
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

  buildWeaponItem = (weapon: Weapon): JSX.Element => {
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

  handleInputControllerInput = (value: any, property: string) => {
    if (PROP_BUTTON === property) {
      this.handleControllerButtonPressed();
    }
    if (PROP_DIRECTION === property) {
      if (this.state.modalVisible) {
        if (Directions.Left === value || Directions.Right === value) {
          this.setState({
            selectedModalButton:
              Directions.Left === value
                ? this.getNextModalButtonLeft()
                : this.getNextModalButtonRight(),
          });
        }
      } else {
        const selectedItemIndex = this.getSelectedUiElementIndex();
        switch (value) {
          case Directions.Left:
            this.shopItemNavigationLeft(selectedItemIndex);
            break;
          case Directions.Right:
            this.shopItemNavigationRight(selectedItemIndex);
            break;
          case Directions.Up:
            this.shopItemNavigationUp(selectedItemIndex);
            break;
          case Directions.Down:
            this.shopItemNavigationDown(selectedItemIndex);
            break;
        }
      }
    }
  };

  private shopItemNavigationDown = (selectedItemIndex: number) => {
    if (-1 !== selectedItemIndex) {
      if (5 <= selectedItemIndex / 5) {
        this.setState({
          selectedGrenade: null,
          selectedAmmunition: null,
          selectedWeapon: null,
        });
      } else {
        this.uiElements[selectedItemIndex + 5]();
      }
    } else {
      this.uiElements[4]();
    }
  };

  private shopItemNavigationUp = (selectedItemIndex: number) => {
    if (-1 !== selectedItemIndex) {
      if (1 >= selectedItemIndex / 5) {
        this.setState({
          selectedGrenade: null,
          selectedAmmunition: null,
          selectedWeapon: null,
        });
      } else {
        this.uiElements[selectedItemIndex - 5]();
      }
    } else {
      this.uiElements[this.uiElements.length - 1]();
    }
  };

  private shopItemNavigationRight = (selectedItemIndex: number) => {
    if (-1 !== selectedItemIndex) {
      if (4 === selectedItemIndex % 5) {
        this.uiElements[selectedItemIndex - 4]();
      } else {
        this.uiElements[selectedItemIndex + 1]();
      }
    }
  };

  private shopItemNavigationLeft = (selectedItemIndex: number) => {
    if (-1 !== selectedItemIndex) {
      if (0 === selectedItemIndex % 5) {
        this.uiElements[selectedItemIndex + 4]();
      } else {
        this.uiElements[selectedItemIndex - 1]();
      }
    }
  };

  getSelectedUiElementIndex = (): number => {
    let result = -1;
    for (let i = 0; i < Weapons.length; i++) {
      result++;
      if (this.state.selectedWeapon?.name === Weapons[i].name) {
        return result;
      }
    }
    for (let i = 0; i < Grenades.length; i++) {
      result++;
      if (this.state.selectedGrenade?.name === Grenades[i].name) {
        return result;
      }
    }
    for (let i = 0; i < Ammunitions.length; i++) {
      result++;
      if (this.state.selectedAmmunition?.name === Ammunitions[i].name) {
        return result;
      }
    }
    return -1;
  };

  handleControllerButtonPressed = () => {
    if (this.state.modalVisible) {
      switch (this.state.selectedModalButton) {
        case ModalButtons.BuyItem:
          this.buySelectedItem();
          break;
        case ModalButtons.BuyAmmo:
          this.buyAmmoForSelectedWeapon();
          break;
        case ModalButtons.Close:
          this.closeModal();
          break;
      }
    } else {
      const itemSelected =
        null !== this.state.selectedAmmunition ||
        null !== this.state.selectedGrenade ||
        null !== this.state.selectedWeapon;

      if (itemSelected) {
        this.setState({
          modalVisible: true,
          selectedModalButton: this.getDefaultModalButtonSelection(),
        });
      } else {
        this.handleExitClicked();
      }
    }
  };

  getDefaultModalButtonSelection = (): ModalButtons => {
    if (this.canBuySelectedItem()) return ModalButtons.BuyItem;
    if (this.canBuyAmmoForSelectedWeapon()) return ModalButtons.BuyAmmo;
    return ModalButtons.Close;
  };

  getNextModalButtonLeft = (): ModalButtons => {
    switch (this.state.selectedModalButton) {
      case ModalButtons.Close:
        if (this.canBuyAmmoForSelectedWeapon()) return ModalButtons.BuyAmmo;
        if (this.canBuySelectedItem()) return ModalButtons.BuyItem;
        return ModalButtons.Close;
      case ModalButtons.BuyAmmo:
        return this.canBuySelectedItem()
          ? ModalButtons.BuyItem
          : ModalButtons.BuyAmmo;
      case ModalButtons.BuyItem:
        return ModalButtons.BuyItem;
      default:
        return ModalButtons.Close;
    }
  };

  getNextModalButtonRight = (): ModalButtons => {
    if (ModalButtons.BuyItem === this.state.selectedModalButton)
      return this.canBuyAmmoForSelectedWeapon()
        ? ModalButtons.BuyAmmo
        : ModalButtons.Close;
    if (ModalButtons.BuyAmmo === this.state.selectedModalButton)
      return ModalButtons.Close;
    return ModalButtons.Close;
  };
}

export default ShopScreen;
