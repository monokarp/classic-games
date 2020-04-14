import { TileState } from '../../const/battleships/tile-state.js';

export class BattleshipsTile {
  constructor(x, y) {
    this.location = { x, y };
    this.state = TileState.Consealed;
  }
};
