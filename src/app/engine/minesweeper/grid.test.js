import { GridSize } from '../../const/minesweeper/grid-size';
import { MinesweeperGrid } from './grid';
import { TileState } from '../../const/minesweeper/tile-state';
import { isEqual } from 'lodash';

describe('MinesweeperGrid', () => {
  let grid;

  beforeEach(() => {
    grid = new MinesweeperGrid();
  });

  describe('init', () => {
    it('should init game state', () => {
      grid.init({ x: 0, y: 0 });

      const state = grid.getState();

      expect(state.length).toEqual(GridSize.cols);

      expect(state.every(row => row.length === GridSize.rows)).toEqual(true);
    });

    it('should seed bombs', () => {
      const location = { x: 5, y: 3 };
      let bombCount = 0;

      grid.init(location);

      grid.forEachTile(tile => {
        if (tile.hasBomb) {
          bombCount++;
        }
      });

      expect(bombCount).toBeGreaterThan((GridSize.rows * GridSize.cols) / 5);

      expect(grid.get(location).hasBomb).toEqual(false);
    });

    it('should set adjacent bomb counts', () => {
      grid.init({ x: 8, y: 3 });

      grid.forEachTile(tile => {
        expect(tile.adjacentBombs).toEqual(
          grid.getAdjacentTiles(tile)
            .reduce((total, next) =>
              total + (next.hasBomb ? 1 : 0), 0)
        );
      });
    });
  });

  describe('getState', () => {
    it('should not modify internal state', () => {
      grid.init({ x: 0, y: 0 });

      const state = grid.getState();

      state[0][0] = { test: 'test' };

      expect(isEqual(grid.getState()[0][0], state[0][0])).toEqual(false);
    });
  });

  describe('revealAll', () => {
    it('should set all tile states to open', () => {
      grid.init({ x: 0, y: 0 });

      grid.revealAll();

      grid.forEachTile(tile => expect(tile.state).toEqual(TileState.Opened));
    });
  });
});
