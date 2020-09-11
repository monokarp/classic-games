import { MinesweeperBrowserRenderer } from './minesweeper-browser/renderer';

export function createRenderer(gameType, hostElementId) {
  switch (gameType) {
    case 'minesweeper': return new MinesweeperBrowserRenderer(hostElementId);
    default: throw new Error('Unknown game type');
  }
}
