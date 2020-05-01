import { GameEvents } from '../../const/common/game-events';
import { GridSize } from '../../const/minesweeper/grid-size';
import { MinesweeperEngine } from './engine';
import { TileState } from '../../const/minesweeper/tile-state';

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

  it('should init and emit initial game state', (done) => {
    engine.addListener(GameEvents.StateChanged, state => {
      expect(state.length).toEqual(GridSize.rows);

      state.forEach(row => expect(row.length).toEqual(GridSize.cols));

      expect(state[0][0]).toMatchObject({
        location: { x: 0, y: 0 },
        hasBomb: false,
        state: TileState.Opened
      });

      done();
    });

    engine.initGameState({ x: 0, y: 0 });
  });

  describe('processAction', () => {
  });
});
