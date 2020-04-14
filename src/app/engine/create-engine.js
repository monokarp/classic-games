import { BattleshipsEngine } from "./battleships/engine";
import { MinesweeperEngine } from "./minesweeper/engine";

export function createEngine(gameType) {
  switch (gameType) {
    case 'battleships': return new BattleshipsEngine();
    case 'minesweeper': return new MinesweeperEngine();
    default: throw new Error('Unknown game type');
  }
}