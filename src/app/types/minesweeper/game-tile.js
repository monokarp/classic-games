import { TileState } from '../../const/minesweeper/tile-state.js';
import { isEqual } from 'lodash';

export class MinesweeperTile {
  constructor(x, y) {
    this.location = { x, y };

    this.hasBomb = false;

    this.adjacentBombs = 0;

    this.state = TileState.Concealed;
  }

  locatedOn(point) {
    return isEqual(this.location, point);
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
