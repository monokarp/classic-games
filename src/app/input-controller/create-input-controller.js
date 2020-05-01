import { MinesweeperInputController } from './minesweeper/cointroller';

export function createInputController(gameType) {
  switch (gameType) {
    case 'minesweeper': return new MinesweeperInputController();
    default: throw new Error('Unknown game type');
  }
}
