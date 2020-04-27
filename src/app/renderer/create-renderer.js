import { MinesweeperBrowserRenderer } from "./minesweeper/renderer";

export function createRenderer(gameType) {
  switch (gameType) {
    case 'minesweeper': return new MinesweeperBrowserRenderer();
    default: throw new Error('Unknown game type');
  }
}