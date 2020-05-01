import { GridSize } from '../const/minesweeper/grid-size';
import { MinesweeperEngine } from './minesweeper/engine';
import { MinesweeperGrid } from './minesweeper/grid';
import { MinesweeperTile } from '../types/minesweeper/game-tile';

export function createEngine(gameType) {
  switch (gameType) {
    case 'minesweeper': return new MinesweeperEngine(
      new MinesweeperGrid(
        MinesweeperTile,
        GridSize.rows,
        GridSize.cols
      )
    );
    default: throw new Error('Unknown game type');
  }
}
