import { BrowserInputController } from './minesweeper/cointroller';

export function createInputController(gameType) {
  switch (gameType) {
    case 'minesweeper': return new BrowserInputController();
    default: throw new Error('Unknown game type');
  }
}
