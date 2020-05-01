import { MinesweeperEngine } from './engine';

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
});
