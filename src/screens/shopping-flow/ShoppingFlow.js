import React, { useState } from 'react';
import BuyYourWeaponsScreen from '../buy-your-weapons/BuyYourWeaponsScreen';
import ShopScreen from '../shop/ShopScreen';
import PlayerController from '../../game/PlayerController';
import { LETS_BEGIN_MESSAGE_SCREEN_NAME } from '../lets-begin/LetsBeginScreen';
import SoundBoard, {MUSIC_THEME} from '../../game/SoundBoard';

function ShoppingFlow(props) {
  const [step, setStep] = useState(0);
  const [player, setPlayer] = useState(PlayerController.getRemainingPlayers()[0].index);

  function onShopFinished() {
    if(player + 1 === PlayerController.getRemainingPlayers().length) {
      setTimeout(fadeOutMusic, 200);
    } else {
      setStep(0);
      setPlayer(player +1);
    }
  }

  function fadeOutMusic() {
    const volume = SoundBoard.getVolume(MUSIC_THEME);
    if(0 < volume) {
      SoundBoard.setVolume(MUSIC_THEME, Math.max(volume - 0.05, 0));
      setTimeout(fadeOutMusic, 200);
    } else {
      SoundBoard.stop(MUSIC_THEME);
      SoundBoard.setVolume(MUSIC_THEME, 1);
      props.onScreenChangeRequired(LETS_BEGIN_MESSAGE_SCREEN_NAME);
    }
  }

  if(0 === step) {
    return <BuyYourWeaponsScreen player={ player } onScreenChangeRequired={ () => setStep(1) } />
  } else {
    return <ShopScreen player={ player } onScreenChangeRequired={ onShopFinished } />
  }
}

export const SHOPPING_FLOW_NAME = 'shopping-flow';
export default ShoppingFlow;
