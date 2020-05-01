import { MinesweeperGrid } from './grid';
import { MinesweeperTile } from '../../types/minesweeper/game-tile';
import { TileState } from '../../const/minesweeper/tile-state';
import { isEqual } from 'lodash';

const rowCount = 3;
const colCount = 5;
const testRatio = 5;

describe('MinesweeperGrid', () => {
  let grid;

  beforeEach(() => {
    grid = new MinesweeperGrid(MinesweeperTile, rowCount, colCount);
  });

  describe('init', () => {
    it('should init game state', () => {
      grid.init({ x: 0, y: 0 });

      const state = grid.getState();

      expect(state.length).toEqual(rowCount);

      expect(state.every(row => row.length === colCount)).toEqual(true);
    });

    it('should seed bombs', () => {
      const location = { x: 2, y: 4 };
      let bombCount = 0;

      grid.init(location);

      grid.forEachTile(tile => {
        if (tile.hasBomb) {
          bombCount++;
        }
      });

      expect(bombCount).toBeGreaterThanOrEqual(Math.floor((rowCount * colCount) / testRatio));

      expect(grid.concealedTilesCount).toEqual((rowCount * colCount) - bombCount);

      expect(grid.get(location).hasBomb).toEqual(false);
    });

    it('should set adjacent bomb counts', () => {
      grid.init({ x: 1, y: 3 });

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
