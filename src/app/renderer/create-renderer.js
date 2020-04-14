import { BattleshipsBrowserRenderer } from "./battleships/renderer";
import { MinesweeperBrowserRenderer } from "./minesweeper/renderer";

export function createRenderer(gameType) {
  switch (gameType) {
    case 'battleships': return new BattleshipsBrowserRenderer();
    case 'minesweeper': return new MinesweeperBrowserRenderer();
    default: throw new Error('Unknown game type');
  }
}