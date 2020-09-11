import { BrowserInputController } from './minesweeper/cointroller';

export function createInputController(gameType, hostElementId) {
  switch (gameType) {
    case 'minesweeper': return new BrowserInputController(hostElementId);
    default: throw new Error('Unknown game type');
  }
}
