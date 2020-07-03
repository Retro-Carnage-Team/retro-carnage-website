import BackgroundTile from './BackgroundTile';
import {DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP} from './Directions';

const BACKGROUND_OFFSETS = { };
BACKGROUND_OFFSETS[DIRECTION_UP] = { x: 0, y: -1500 };
BACKGROUND_OFFSETS[DIRECTION_LEFT] = { x: -1500, y: 0 };
BACKGROUND_OFFSETS[DIRECTION_RIGHT] = { x: 1500, y: 0 };

const SCROLL_BARRIER_UP = 1_000;
const SCROLL_BARRIER_LEFT = 1_000;
const SCROLL_BARRIER_RIGHT = 500;

const SCROLL_MOVEMENT_PER_MS = 0.3;                                                                                     // Screen.width = 1500 / 5.000 milliseconds = 0.2 px / ms

export default class LevelController {

  constructor(missionSegments) {
    this.segments = missionSegments;
    this.currentSegmentIdx = 0;
    this.distanceToScroll = 0;
    this.distanceScrolled = 0;
    this.segmentScrollLengthInPixels = 0;
    this.loadSegment(this.segments[this.currentSegmentIdx]);
  }

  loadSegment = (segment) => {
    this.backgrounds = segment.backgrounds.map((bg, idx) => {
      const offsets = BACKGROUND_OFFSETS[segment.direction];
      return new BackgroundTile(`images/backgrounds/${bg}`, idx * offsets.x, idx * offsets.y);
    });
    this.segmentScrollLengthInPixels = 1500 * (this.backgrounds.length -1);
    this.distanceScrolled = 0;
    this.distanceToScroll = 0;
  }

  progressToNextSegment = () => {
    if(this.currentSegmentIdx +1 < this.segments.length) {
      this.currentSegmentIdx++;
      this.loadSegment(this.segments[this.currentSegmentIdx]);
    }
  }

  updatePosition = (elapsedTimeInMs, playerPositions) => {
    // TODO: This currently ignores the position of the second player. We should only scroll if we don't kick the other
    //       player out of the visible area

    const scrollDistanceByPlayerPosition = this.getDistanceBehindScrollBarrier(playerPositions);                        // How far is the player behind the scroll barrier?
    this.distanceToScroll = Math.max(scrollDistanceByPlayerPosition, this.distanceToScroll);                            // Has he been further behind the barrier before?

    const availablePixelsToScroll = Math.min(
      this.segmentScrollLengthInPixels - this.distanceScrolled,                                                   // number if pixels to scroll left for this segment
      Math.floor(elapsedTimeInMs * SCROLL_MOVEMENT_PER_MS),                                                           // scroll distance for the elapsed time
      this.distanceToScroll                                                                                             // distance by player position behind scroll barrier
    );

    return this.scroll(availablePixelsToScroll);
  }

  scroll = (pixels) => {
    this.distanceToScroll -= pixels;
    this.distanceScrolled += pixels;

    const direction = this.segments[this.currentSegmentIdx].direction;
    if(DIRECTION_UP === direction) {
     return this.scrollUp(pixels);
    }
    if(DIRECTION_LEFT === direction) {
      return this.scrollLeft(pixels);
    }
    if(DIRECTION_RIGHT === direction) {
      return this.scrollRight(pixels);
    }
  }

  scrollUp = (pixels) => {
    this.backgrounds.forEach((bg) => bg.offsetY += pixels);
    if(0 <= this.backgrounds[this.backgrounds.length -1].offsetY) {
      this.backgrounds[this.backgrounds.length -1].offsetY = 0;
      this.progressToNextSegment();
    }
    return { x: 0, y: -pixels };
  }

  scrollLeft = (pixels) => {
    this.backgrounds.forEach((bg) => bg.offsetX -= pixels);
    if(0 >= this.backgrounds[this.backgrounds.length -1].offsetX) {
      this.backgrounds[this.backgrounds.length -1].offsetX = 0;
      this.progressToNextSegment();
    }
    return { x: -pixels, y: 0 };
  }

  scrollRight = (pixels) => {
    this.backgrounds.forEach((bg) => bg.offsetX += pixels);
    if(0 <= this.backgrounds[this.backgrounds.length -1].offsetX) {
      this.backgrounds[this.backgrounds.length -1].offsetX = 0;
      this.progressToNextSegment();
    }
    return { x: pixels, y: 0 };
  }

  getVisibleTiles = () => {
    return this.backgrounds.filter((bg) =>
      (-1500 < bg.offsetX) && (1500 > bg.offsetX) &&
      (-1500 < bg.offsetY) && (1500 > bg.offsetY)
    );
  }

  getDistanceBehindScrollBarrier = (playerPositions) => {
    const direction = this.segments[this.currentSegmentIdx].direction;
    if(DIRECTION_UP === direction) {
      let topMostPosition = 1500;
      playerPositions.forEach((pos) => topMostPosition = Math.min(topMostPosition, pos.y));
      return SCROLL_BARRIER_UP - topMostPosition;
    }
    if(DIRECTION_LEFT === direction) {
      let leftMostPosition = 1500;
      playerPositions.forEach((pos) => leftMostPosition = Math.min(leftMostPosition, pos.x));
      return SCROLL_BARRIER_LEFT - leftMostPosition;
    }
    if(DIRECTION_RIGHT === direction) {
      let rightMostPosition = 0;
      playerPositions.forEach((pos) => rightMostPosition = Math.max(rightMostPosition, pos.x + pos.width));
      return rightMostPosition - SCROLL_BARRIER_RIGHT;
    }
  }

}