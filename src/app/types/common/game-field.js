import { matrixOf } from '../../utils/matrix-of.js';

export class GameField {
  constructor(tileType) {
    this.tileGrid = matrixOf(tileType);
  }

  get(location) {
    return this.tileGrid[location.x][location.y];
  }

  set(location, newState) {
    this.tileGrid[location.x][location.y].state = newState;
  }
};
