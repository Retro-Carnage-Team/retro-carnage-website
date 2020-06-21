import BackgroundTile from './BackgroundTile';
import {DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP} from './Directions';

const BACKGROUND_OFFSETS = { };
BACKGROUND_OFFSETS[DIRECTION_UP] = { x: 0, y: -1500 };
BACKGROUND_OFFSETS[DIRECTION_LEFT] = { x: -1500, y: 0 };
BACKGROUND_OFFSETS[DIRECTION_RIGHT] = { x: 1500, y: 0 };

const SCROLL_BARRIER_UP = 1_000;
const SCROLL_BARRIER_LEFT = 1_000;
const SCROLL_BARRIER_RIGHT = 500;

export default class LevelController {

  constructor(missionSegments) {
    this.segments = missionSegments;
    this.currentSegmentIdx = 0;
    this.loadSegment(this.segments[this.currentSegmentIdx]);
  }

  loadSegment = (segment) => {
    this.backgrounds = segment.backgrounds.map((bg, idx) => {
      const offsets = BACKGROUND_OFFSETS[segment.direction];
      return new BackgroundTile(`images/backgrounds/${bg}`, idx * offsets.x, idx * offsets.y);
    });
  }

  progressToNextSegment = () => {
    if(this.currentSegmentIdx +1 < this.segments.length) {
      this.currentSegmentIdx++;
      this.loadSegment(this.segments[this.currentSegmentIdx]);
    }
  }

  updatePosition = (elapsedTimeInMs, playerPositions) => {
    const scrollDistance = this.getDistanceBehindScrollBarrier(playerPositions);
    // TODO: scrollDistance is how far the background has to scroll based on the current player position.
    //       If this is larger than the current value, we increase the current value
    // TODO: Get the number of pixels we have to scroll now based on the elapsed time. Update all offsets and the
    //       current scroll-distance value. Then return the number of pixels that we scrolled to x and y as an object
  }

  scroll = (pixels) => {
    const direction = this.segments[this.currentSegmentIdx].direction;
    if(DIRECTION_UP === direction) {
     this.scrollUp(pixels);
    }
    if(DIRECTION_LEFT === direction) {
      this.scrollLeft(pixels);
    }
    if(DIRECTION_RIGHT === direction) {
      this.scrollRight(pixels);
    }
  }

  scrollUp = (pixels) => {
    this.backgrounds.forEach((bg) => bg.offsetY += pixels);
    if(0 <= this.backgrounds[this.backgrounds.length -1].offsetY) {
      this.backgrounds[this.backgrounds.length -1].offsetY = 0;
      this.progressToNextSegment();
    }
  }

  scrollLeft = (pixels) => {
    this.backgrounds.forEach((bg) => bg.offsetX -= pixels);
    if(0 >= this.backgrounds[this.backgrounds.length -1].offsetX) {
      this.backgrounds[this.backgrounds.length -1].offsetX = 0;
      this.progressToNextSegment();
    }
  }

  scrollRight = (pixels) => {
    this.backgrounds.forEach((bg) => bg.offsetX += pixels);
    if(0 <= this.backgrounds[this.backgrounds.length -1].offsetX) {
      this.backgrounds[this.backgrounds.length -1].offsetX = 0;
      this.progressToNextSegment();
    }
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