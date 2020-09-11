import { GameEvents } from '../../const/common/game-events';
import { GridSize } from '../../const/minesweeper/grid-size';
import { MinesweeperEngine } from './engine';
import { MinesweeperEvents } from '../../const/minesweeper/events';
import { MinesweeperGrid } from './grid';
import { MinesweeperTile } from '../../types/minesweeper/game-tile';
import { TileState } from '../../const/minesweeper/tile-state';

class TestGrid extends MinesweeperGrid {
  seedBombs() {
    this.concealedTilesCount = (GridSize.rows * GridSize.cols) - 1;
    this.state[0][3].hasBomb = true;
  }
}

describe('MinesweeperEngine', () => {
  let engine;
  let grid;

  beforeEach(() => {
    grid = new TestGrid(
      MinesweeperTile,
      GridSize.rows,
      GridSize.cols
    );

    engine = new MinesweeperEngine(grid);
  });

  it('should emit events', (done) => {
    engine.addListener('test', val => {
      expect(val).toEqual({ payload: 'test' });
      done();
    });

    engine.emit('test', { payload: 'test' });
  });

  it('should reset and emit state', (done) => {
    engine.addListener(GameEvents.StateChanged, state => {
      for (let i = 0; i < GridSize.rows; i++) {
        for (let j = 0; j < GridSize.cols; j++) {
          expect(state[i][j]).toMatchObject({
            hasBomb: false,
            adjacentBombs: 0,
            state: TileState.Concealed
          });
        }
      }

      done();
    });

    engine.setDefaultState();
  });

  it('should start game', (done) => {
    engine.addListener(GameEvents.StateChanged, state => {
      expect(state.length).toEqual(GridSize.rows);

      state.forEach(row => expect(row.length).toEqual(GridSize.cols));

      expect(state[0][2]).toMatchObject({
        location: { x: 0, y: 2 },
        hasBomb: false,
        state: TileState.Opened
      });

      done();
    });

    engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });
  });

  describe('actions', () => {
    describe('reveal', () => {
      it('should open a closed tile', (done) => {
        const point = { x: 1, y: 2 };

        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.addListener(GameEvents.StateChanged, state => {
          for (let i = 0; i < GridSize.rows; i++) {
            for (let j = 0; j < GridSize.cols; j++) {
              let expectedState;

              if ([0, 1].includes(i) && j === 2) {
                expectedState = {
                  hasBomb: false,
                  adjacentBombs: 1,
                  state: TileState.Opened
                };
              } else {
                expectedState = {
                  state: TileState.Concealed
                };
              }

              expect(state[i][j]).toMatchObject(expectedState);
            }
          }

          done();
        });

        engine.processAction({ type: MinesweeperEvents.Reveal, point });
      });

      it('should trigger cascade reveal', (done) => {
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.addListener(GameEvents.GameWon, state => {
          for (let i = 0; i < GridSize.rows; i++) {
            for (let j = 0; j < GridSize.cols; j++) {
              let expectedState;

              if (i === 0 && j === 3) {
                expectedState = {
                  hasBomb: true,
                  adjacentBombs: 0,
                  state: TileState.Concealed
                };
              } else if ([0, 1].includes(i) && [2, 3, 4].includes(j)) {
                expectedState = {
                  hasBomb: false,
                  adjacentBombs: 1,
                  state: TileState.Opened
                };
              } else {
                expectedState = {
                  hasBomb: false,
                  adjacentBombs: 0,
                  state: TileState.Opened
                };
              }

              expect(state[i][j]).toMatchObject(expectedState);
            }
          }

          done();
        });

        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 0 } });
      });

      it('should trigger game over', (done) => {
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.addListener(GameEvents.GameLost, state => {
          for (let i = 0; i < GridSize.rows; i++) {
            for (let j = 0; j < GridSize.cols; j++) {
              expect(state[i][j]).toMatchObject({ state: TileState.Opened });
            }
          }

          done();
        });

        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 3 } });
      });
    });

    describe('reveal adjacent', () => {
      it('should abort unless expected adjacent bombs are marked', (done) => {
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.addListener(GameEvents.StateChanged, state => {
          for (let i = 0; i < GridSize.rows; i++) {
            for (let j = 0; j < GridSize.cols; j++) {
              let expectedState;

              if (i === 0 && j === 2) {
                expectedState = {
                  hasBomb: false,
                  adjacentBombs: 1,
                  state: TileState.Opened
                };
              } else {
                expectedState = {
                  state: TileState.Concealed
                };
              }

              expect(state[i][j]).toMatchObject(expectedState);
            }
          }

          done();
        });

        engine.processAction({ type: MinesweeperEvents.BatchReveal, point: { x: 0, y: 2 } });
      });

      it('should reveal adjacent tiles', (done) => {
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.processAction({ type: MinesweeperEvents.Flag, point: { x: 0, y: 3 } });

        engine.addListener(GameEvents.GameWon, state => {
          for (let i = 0; i < GridSize.rows; i++) {
            for (let j = 0; j < GridSize.cols; j++) {
              let expectedState;

              if (i === 0 && j === 3) {
                expectedState = {
                  hasBomb: true,
                  adjacentBombs: 0,
                  state: TileState.Flagged
                };
              } else {
                expectedState = {
                  state: TileState.Opened
                };
              }

              expect(state[i][j]).toMatchObject(expectedState);
            }
          }

          done();
        });

        engine.processAction({ type: MinesweeperEvents.BatchReveal, point: { x: 0, y: 2 } });
      });

      it('should trigger game over', (done) => {
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.processAction({ type: MinesweeperEvents.Flag, point: { x: 1, y: 3 } });

        engine.addListener(GameEvents.GameLost, state => {
          for (let i = 0; i < GridSize.rows; i++) {
            for (let j = 0; j < GridSize.cols; j++) {
              expect(state[i][j]).toMatchObject({ state: TileState.Opened });
            }
          }

          done();
        });

        engine.processAction({ type: MinesweeperEvents.BatchReveal, point: { x: 0, y: 2 } });
      });
    });

    describe('flag', () => {
      it('should ignore an opened tile', (done) => {
        const point = { x: 0, y: 2 };

        engine.startGame(point);

        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][2]).toMatchObject({ state: TileState.Opened });
          done();
        });

        engine.processAction({ type: MinesweeperEvents.Flag, point });
      });

      it('should flag a concealed tile', (done) => {
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][0]).toMatchObject({ state: TileState.Flagged });
          done();
        });

        engine.processAction({
          type: MinesweeperEvents.Flag,
          point: { x: 0, y: 0 }
        });
      });

      it('should conceal mark a flagged tile', (done) => {
        const point = { x: 0, y: 0 };
        engine.processAction({ type: MinesweeperEvents.Reveal, point: { x: 0, y: 2 } });

        engine.processAction({ type: MinesweeperEvents.Flag, point });

        engine.addListener(GameEvents.StateChanged, state => {
          expect(state[0][0]).toMatchObject({ state: TileState.Concealed });
          done();
        });

        engine.processAction({ type: MinesweeperEvents.Flag, point });
      });
    });
  });
});
