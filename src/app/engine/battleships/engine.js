import { GameField } from "../../types/common/game-field";
import { BattleshipsTile } from "../../types/battleships/game-tile";

export class BattleshipsEngine {
  constructor(inputController) {
    this.controller = inputController;

    // need 2
    this.gameState = new GameField(BattleshipsTile);

    this._isGameOver = false;
  }

  // replace w/ event emitter
  onStateChange(handler) {
    handler(this.gameState);
  }

  initGameState() {
    return new Promise((res, rej) => {
      res();
    });
    // place ships
  }

  handleAction() {
    return new Promise((res, rej) => {
      res();
    });
  }

  isGameOver() {
    return this._isGameOver;
  }
}