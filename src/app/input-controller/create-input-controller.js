import { BattleshipsInputController } from "./battleships/cointroller";
import { MinesweeperInputController } from "./minesweeper/cointroller";

export function createInputController(gameType) {
  switch (gameType) {
    case 'battleships': return new BattleshipsInputController();
    case 'minesweeper': return new MinesweeperInputController();
    default: throw new Error('Unknown game type');
  }
}