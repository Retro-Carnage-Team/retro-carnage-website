import BackgroundTile from "./BackgroundTile";
import { Directions } from "./Directions";
import { Segment } from "./Missions";
import Rectangle from "./Rectangle";
import Offset from "./Offset";
import Enemy from "./Enemy";

const BACKGROUND_OFFSETS: Map<Directions, Offset> = new Map<
  Directions,
  Offset
>();
BACKGROUND_OFFSETS.set(Directions.Up, { x: 0, y: -1500 });
BACKGROUND_OFFSETS.set(Directions.Left, { x: -1500, y: 0 });
BACKGROUND_OFFSETS.set(Directions.Right, { x: 1500, y: 0 });

const SCROLL_BARRIER_UP = 1_000;
const SCROLL_BARRIER_LEFT = 1_000;
const SCROLL_BARRIER_RIGHT = 500;

const SCROLL_MOVEMENT_PER_MS = 0.3; // Screen.width = 1500 / 5.000 milliseconds = 0.2 px / ms

export default class LevelController {
  private currentSegmentIdx: number;
  private distanceToScroll: number;
  private distanceScrolled: number;
  private enemies: Enemy[];
  private goal: Rectangle | null;
  private obstacles: Rectangle[];
  private readonly segments: Segment[];
  private segmentScrollLengthInPixels: number;

  backgrounds: BackgroundTile[];

  constructor(missionSegments: Segment[]) {
    this.segments = missionSegments;
    this.backgrounds = [];
    this.currentSegmentIdx = 0;
    this.distanceToScroll = 0;
    this.distanceScrolled = 0;
    this.enemies = [];
    this.goal = null;
    this.obstacles = [];
    this.segmentScrollLengthInPixels = 0;
    this.loadSegment(this.segments[this.currentSegmentIdx]);
  }

  loadSegment = (segment: Segment) => {
    this.goal = segment.goal;
    this.backgrounds = segment.backgrounds.map((bg, idx) => {
      let offsets = BACKGROUND_OFFSETS.get(segment.direction);
      if (!offsets) {
        offsets = { x: 0, y: 0 };
      }
      return new BackgroundTile(
        `images/backgrounds/${bg}`,
        idx * offsets.x,
        idx * offsets.y
      );
    });
    this.segmentScrollLengthInPixels = 1500 * (this.backgrounds.length - 1);
    this.enemies = [...segment.enemies];
    this.obstacles = segment.obstacles;
    this.distanceScrolled = 0;
    this.distanceToScroll = 0;
  };

  progressToNextSegment = () => {
    if (this.currentSegmentIdx + 1 < this.segments.length) {
      this.currentSegmentIdx++;
      this.loadSegment(this.segments[this.currentSegmentIdx]);
    }
  };

  /**
   * Returns the enemies that have been activated since the last scroll movement
   */
  getActivatedEnemies = () => {
    const result = this.enemies.filter(
      (enemy) => this.distanceScrolled >= enemy.activationDistance
    );
    this.enemies = this.enemies.filter(
      (enemy) => this.distanceScrolled < enemy.activationDistance
    );
    return result;
  };

  updatePosition = (elapsedTimeInMs: number, playerPositions: Rectangle[]) => {
    // TODO: This currently ignores the position of the second player. We should only scroll if we don't kick the other
    //       player out of the visible area

    // How far is the player behind the scroll barrier?
    const scrollDistanceByPlayerPosition = this.getDistanceBehindScrollBarrier(
      playerPositions
    );

    // Has he been further behind the barrier before?
    this.distanceToScroll = Math.max(
      scrollDistanceByPlayerPosition,
      this.distanceToScroll
    );

    const availablePixelsToScroll = Math.min(
      this.segmentScrollLengthInPixels - this.distanceScrolled, // number if pixels to scroll left for this segment
      Math.floor(elapsedTimeInMs * SCROLL_MOVEMENT_PER_MS), // scroll distance for the elapsed time
      this.distanceToScroll // distance by player position behind scroll barrier
    );

    return this.scroll(availablePixelsToScroll);
  };

  scroll = (pixels: number): Offset => {
    this.distanceToScroll -= pixels;
    this.distanceScrolled += pixels;

    const direction = this.segments[this.currentSegmentIdx].direction;
    if (Directions.Up === direction) {
      return this.scrollUp(pixels);
    }
    if (Directions.Left === direction) {
      return this.scrollLeft(pixels);
    }
    if (Directions.Right === direction) {
      return this.scrollRight(pixels);
    }
    return { x: 0, y: 0 }; // should not happen
  };

  scrollUp = (pixels: number): Offset => {
    this.backgrounds.forEach((bg) => (bg.offsetY += pixels));
    if (this.goal) {
      this.goal.y += pixels;
    }
    if (0 <= this.backgrounds[this.backgrounds.length - 1].offsetY) {
      this.backgrounds[this.backgrounds.length - 1].offsetY = 0;
      this.progressToNextSegment();
    }
    return { x: 0, y: -pixels };
  };

  scrollLeft = (pixels: number): Offset => {
    this.backgrounds.forEach((bg) => (bg.offsetX += pixels));
    if (this.goal) {
      this.goal.x += pixels;
    }
    if (0 <= this.backgrounds[this.backgrounds.length - 1].offsetX) {
      this.backgrounds[this.backgrounds.length - 1].offsetX = 0;
      this.progressToNextSegment();
    }
    return { x: -pixels, y: 0 };
  };

  scrollRight = (pixels: number): Offset => {
    this.backgrounds.forEach((bg) => (bg.offsetX -= pixels));
    if (this.goal) {
      this.goal.x -= pixels;
    }
    if (0 >= this.backgrounds[this.backgrounds.length - 1].offsetX) {
      this.backgrounds[this.backgrounds.length - 1].offsetX = 0;
      this.progressToNextSegment();
    }
    return { x: pixels, y: 0 };
  };

  getVisibleTiles = (): BackgroundTile[] => {
    return this.backgrounds.filter(
      (bg) =>
        -1500 < bg.offsetX &&
        1500 > bg.offsetX &&
        -1500 < bg.offsetY &&
        1500 > bg.offsetY
    );
  };

  getDistanceBehindScrollBarrier = (playerPositions: Rectangle[]): number => {
    const direction = this.segments[this.currentSegmentIdx].direction;
    if (Directions.Up === direction) {
      let topMostPosition = 1500;
      playerPositions.forEach(
        (pos) => (topMostPosition = Math.min(topMostPosition, pos.y))
      );
      return SCROLL_BARRIER_UP - topMostPosition;
    }
    if (Directions.Left === direction) {
      let leftMostPosition = 1500;
      playerPositions.forEach(
        (pos) => (leftMostPosition = Math.min(leftMostPosition, pos.x))
      );
      return SCROLL_BARRIER_LEFT - leftMostPosition;
    }
    if (Directions.Right === direction) {
      let rightMostPosition = 0;
      playerPositions.forEach(
        (pos) =>
          (rightMostPosition = Math.max(rightMostPosition, pos.x + pos.width))
      );
      return rightMostPosition - SCROLL_BARRIER_RIGHT;
    }
    return 0; // should not happen
  };

  isGoalReached = (playerPositions: Rectangle[]): boolean => {
    if (this.goal) {
      return (
        undefined !==
        playerPositions.find(
          (value) => null !== this.goal?.getIntersection(value)
        )
      );
    }
    return false;
  };

  getObstaclesOnScreen = (): Rectangle[] => {
    const screenRect = new Rectangle(0, 0, 1500, 1500);
    const direction = this.segments[this.currentSegmentIdx].direction;

    let scrollAdjustment: Offset = { x: 0, y: 0 };
    switch (direction) {
      case Directions.Up:
        scrollAdjustment = { x: 0, y: this.distanceScrolled };
        break;
      case Directions.Left:
        scrollAdjustment = { x: this.distanceScrolled, y: 0 };
        break;
      case Directions.Right:
        scrollAdjustment = { x: -1 * this.distanceScrolled, y: 0 };
        break;
    }

    return this.obstacles
      .map((obstacle) => {
        const { x, y, width, height } = obstacle;
        const result = new Rectangle(x, y, width, height);
        result.add(scrollAdjustment);
        return result;
      })
      .filter((obstacle) => null !== obstacle.getIntersection(screenRect));
  };
}
