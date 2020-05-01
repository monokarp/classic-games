import { GameEvents } from '../../const/common/game-events';
import { GridSize } from '../../const/minesweeper/grid-size';
import { MinesweeperEngine } from './engine';
import { MinesweeperEvents } from '../../const/minesweeper/events';
import { MinesweeperGrid } from './grid';
import { MinesweeperTile } from '../../types/minesweeper/game-tile';
import { TileState } from '../../const/minesweeper/tile-state';

class TestGrid extends MinesweeperGrid {
  seedBombs() {
    this.state[5][5].hasBomb = true;
  }
}

describe('MinesweeperEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new MinesweeperEngine(
      new TestGrid(
        MinesweeperTile,
        GridSize.rows,
        GridSize.cols
      )
    );
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

  describe('actions', () => {
    describe('reveal', () => {
      it('should open a closed tile', () => {

      });

      it('should abort on an opened tile', () => {

      });

      it('should trigger cascade reveal', () => {

      });

      it('should trigger game over', () => {

      });
    });

    describe('reveal adjacent', () => {
      it('should abort unless expected adjacent bombs are marked', () => {

      });
    });

    describe('flag', () => {
      it('should ignore an opened tile', (done) => {
        const point = { x: 0, y: 0 };

        engine.initGameState(point);

        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][0]).toMatchObject({ state: TileState.Opened });
          done();
        });

        engine.processAction({ type: MinesweeperEvents.Mark, point });
      });

      it('should flag a concealed tile', (done) => {
        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][0]).toMatchObject({ state: TileState.Flagged });
          done();
        });

        engine.processAction({
          type: MinesweeperEvents.Mark,
          point: { x: 0, y: 0 }
        });
      });

      it('should question mark a flagged tile', (done) => {
        const point = { x: 0, y: 0 };

        engine.processAction({ type: MinesweeperEvents.Mark, point });

        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][0]).toMatchObject({ state: TileState.Questioned });
          done();
        });

        engine.processAction({ type: MinesweeperEvents.Mark, point });
      });

      it('should conceal a question mark tile', (done) => {
        const point = { x: 0, y: 0 };

        engine.processAction({ type: MinesweeperEvents.Mark, point });

        engine.processAction({ type: MinesweeperEvents.Mark, point });

        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][0]).toMatchObject({ state: TileState.Concealed });
          done();
        });

        engine.processAction({ type: MinesweeperEvents.Mark, point });
      });
    });
  });
});
