import { MinesweeperGrid } from "./grid";
import { GridSize } from "../../const/minesweeper/grid-size";

describe('MinesweeperGrid', () => {
  let grid;

  beforeEach(() => {
    grid = new MinesweeperGrid();
  });

  it('should init game state', () => {
    const defaultState = grid.getState();

    expect(defaultState.length).toEqual(GridSize.cols);

    expect(defaultState.every(row => row.length === GridSize.rows)).toEqual(true);
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

    expect(bombCount).toBeGreaterThan(GridSize.rows * GridSize.cols / 5);

    expect(grid.get(location).hasBomb).toEqual(false);
  });

  it('should set adjacent bomb counts', () => {
    const location = { x: 8, y: 3 };

    grid.init(location);

    grid.forEachTile(tile => {
      expect(tile.adjacentBombs).toEqual(
        grid.getAdjacentTiles(tile)
          .reduce((total, next) =>
            total + next.hasBomb ? 1 : 0,
            0)
      );
    });
  });
});