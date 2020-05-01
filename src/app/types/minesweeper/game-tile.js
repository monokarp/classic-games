import { TileState } from '../../const/minesweeper/tile-state';
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

  isFlagged() {
    return this.state === TileState.Flagged;
  }

  isEmpty() {
    return !this.hasBomb && !this.adjacentBombs;
  }

  setOpened() {
    this.state = TileState.Opened;
  }

  setAdjacent(count) {
    this.adjacentBombs = count;
  }

  markTile() {
    switch (this.state) {
      case TileState.Concealed: {
        this.state = TileState.Flagged;
        break;
      }
      case TileState.Flagged: {
        this.state = TileState.Concealed;
        break;
      }
      default: break;
    }
  }
}
