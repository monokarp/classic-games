import { MinesweeperEngine } from "./engine";
import { GameEvents } from "../../const/common/game-events";
import { GridSize } from "../../const/minesweeper/grid-size";

describe('MinesweeperEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new MinesweeperEngine();
  });

  it('should emit events', (done) => {
    engine.addListener('test', val => {
      expect(val).toEqual({ payload: 'test' });
      done();
    });

    engine.emit('test', { payload: 'test' });
  });

  it('should init game state', (done) => {
    engine.addListener(GameEvents.StateChanged, state => {
      expect(state.getTilesAmount()).toEqual(GridSize.rows * GridSize.cols);
      done();
    });

    engine.initGameState({ x: 3, y: 3 });
  });

  it('should seed bombs', (done) => {
    const location = { x: 3, y: 3 };
    let bombCount = 0;

    engine.addListener(GameEvents.StateChanged, state => {
      state.forEachTile(tile => {
        if (tile.hasBomb) {
          bombCount++;
        }
      });

      expect(bombCount).toBeGreaterThan(GridSize.rows * GridSize.cols / 5);
      expect(state.get(location).hasBomb).toEqual(false);

      done();
    });

    engine.initGameState(location);
  });

  it('should set adjacent bomb counts', (done) => {
    const location = { x: 3, y: 3 };

    engine.addListener(GameEvents.StateChanged, state => {
      state.forEachTile(tile => {
        expect(tile.adjacentBombs).toEqual(
          state.getAdjacentTiles(tile)
            .reduce((total, next) =>
              total + next.hasBomb ? 1 : 0,
              0)
        );
      });

      done();
    });

    engine.initGameState(location);
  });
});