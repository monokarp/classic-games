import { GameField } from "../../types/common/game-field";
import { BattleshipsTile } from "../../types/battleships/game-tile";

export class BattleshipsEngine {
  constructor(inputController) {
    this.controller = inputController;

    // need 2
    this.gameState = new GameField(BattleshipsTile);
  }

  // replace w/ event emitter
  onStateChange(handler) {
    handler(this.gameState);
  }

  onGameOver(handler) {
    handler();
  }

  initGameState() {
    return new Promise((res, rej) => {
      res();
    });
    // place ships
  }

  handleAction(action) {
    return new Promise((res, rej) => {
      res();
    });
  }
}