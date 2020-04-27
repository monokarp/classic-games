import { MinesweeperEngine } from "./minesweeper/engine";

export function createEngine(gameType) {
  switch (gameType) {
    case 'minesweeper': return new MinesweeperEngine();
    default: throw new Error('Unknown game type');
  }
}