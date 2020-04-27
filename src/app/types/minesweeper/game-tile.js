import { TileState } from '../../const/minesweeper/tile-state.js';
import { equalsShallow } from '../../utils/equals.js';

export class MinesweeperTile {
  constructor(x, y) {
    this.location = { x, y };

    this.hasBomb = false;

    this.adjacentBombs = 0;

    this.state = TileState.Consealed;
  }

  locatedOn(point) {
    return equalsShallow(this.location, point);
  }

  isOpened() {
    return this.state === TileState.Opened;
  }

  setOpen() {
    this.state = TileState.Opened;
  }

  setFlagged() {
    this.state = TileState.Flagged;
  }

  setQuestioned() {
    this.state = TileState.Questioned;
  }
};
