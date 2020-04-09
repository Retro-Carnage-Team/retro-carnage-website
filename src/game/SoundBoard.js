export const FX_CASH = 'cash-register.mp3';
export const FX_ERROR = 'error.mp3';

export const MUSIC_BACKGROUND_1 = 'All-We-Ever-See-of-Stars.mp3';
export const MUSIC_BACKGROUND_2 = 'Beatdown-City.mp3';
export const MUSIC_BACKGROUND_3 = 'Cracked-Streets-And-Broken-Windows.mp3';
export const MUSIC_BACKGROUND_4 = 'Dance-Harder.mp3';
export const MUSIC_BACKGROUND_5 = 'Die-Historic.mp3';
export const MUSIC_BACKGROUND_6 = 'Drive-Fast.mp3';
export const MUSIC_BACKGROUND_7 = 'Gaining-Traction.mp3';
export const MUSIC_BACKGROUND_8 = 'Heavy-Traffic.mp3';
export const MUSIC_BACKGROUND_9 = 'Hot-Nights-In-Los-Angeles.mp3';
export const MUSIC_BACKGROUND_10 = 'It-Cant-Be-Bargained-With.mp3';
export const MUSIC_BACKGROUND_11 = 'Missing-You.mp3';
export const MUSIC_BACKGROUND_12 = 'Raging-Streets.mp3';
export const MUSIC_THEME = 'The-Only-Me-is-Me.mp3';

class SoundBoard {

  constructor() {
    this.sounds = [];

    // sound effects
    this.sounds[FX_CASH] = new Audio('sounds/fx/' + FX_CASH);
    this.sounds[FX_ERROR] = new Audio('sounds/fx/' + FX_ERROR);

    // music
    this.sounds[MUSIC_BACKGROUND_1] = new Audio('sounds/music/' + MUSIC_BACKGROUND_1);
    this.sounds[MUSIC_BACKGROUND_2] = new Audio('sounds/music/' + MUSIC_BACKGROUND_2);
    this.sounds[MUSIC_BACKGROUND_3] = new Audio('sounds/music/' + MUSIC_BACKGROUND_3);
    this.sounds[MUSIC_BACKGROUND_4] = new Audio('sounds/music/' + MUSIC_BACKGROUND_4);
    this.sounds[MUSIC_BACKGROUND_5] = new Audio('sounds/music/' + MUSIC_BACKGROUND_5);
    this.sounds[MUSIC_BACKGROUND_6] = new Audio('sounds/music/' + MUSIC_BACKGROUND_6);
    this.sounds[MUSIC_BACKGROUND_7] = new Audio('sounds/music/' + MUSIC_BACKGROUND_7);
    this.sounds[MUSIC_BACKGROUND_8] = new Audio('sounds/music/' + MUSIC_BACKGROUND_8);
    this.sounds[MUSIC_BACKGROUND_9] = new Audio('sounds/music/' + MUSIC_BACKGROUND_9);
    this.sounds[MUSIC_BACKGROUND_10] = new Audio('sounds/music/' + MUSIC_BACKGROUND_10);
    this.sounds[MUSIC_BACKGROUND_11] = new Audio('sounds/music/' + MUSIC_BACKGROUND_11);
    this.sounds[MUSIC_BACKGROUND_12] = new Audio('sounds/music/' + MUSIC_BACKGROUND_12);
    this.sounds[MUSIC_THEME] = new Audio('sounds/music/' + MUSIC_THEME);
  }

  getVolume = (sound) => {
    return this.sounds[sound].volume;
  }

  setVolume = (sound, volume) => {
    try {
      this.sounds[sound].volume = volume;
    } catch (error) { 
      console.error('Can\'t set volume for sound: ' + sound, error);
    }
  }

  play = (sound) => {
    this.stop(sound);
    try {
      this.sounds[sound].play();
    } catch (error) {
      console.error('Can\'t play sound: ' + sound, error);
    }
  }

  stop = (sound) => {
    try {
      this.sounds[sound].pause();
      this.sounds[sound].currentTime = 0;
    } catch (error) { 
      console.error('Can\'t stop sound: ' + sound, error);
    }
  }

};

const soundBoardInstance = new SoundBoard();
export default soundBoardInstance;