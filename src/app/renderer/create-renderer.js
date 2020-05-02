import { MinesweeperBrowserRenderer } from './minesweeper-browser/renderer';

export function createRenderer(gameType) {
  switch (gameType) {
    case 'minesweeper': return new MinesweeperBrowserRenderer();
    default: throw new Error('Unknown game type');
  }
}
