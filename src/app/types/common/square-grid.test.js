/* eslint-disable no-param-reassign */

import { SquareGrid } from './square-grid';

function TestTile(x, y) {
  this.location = { x, y };
}

describe('TileGrid', () => {
  let grid;

  beforeEach(() => {
    grid = new SquareGrid(TestTile, 2, 2);
  });

  it('should init state', () => {
    grid = new SquareGrid(TestTile, 3, 6);

    expect(grid.state.length).toEqual(3);
    grid.state.forEach(row => expect(row.length).toEqual(6));
  });

  it('should reset state', () => {
    grid.get({ x: 1, y: 1 }).test = 'test';

    grid.resetState();

    expect(grid.get({ x: 1, y: 1 }).test).toBeUndefined();
  });

  describe('forEachTile', () => {
    it('should visit every tile', () => {
      let result = '';

      grid.forEachTile(
        (tile) => {
          result = `${result}${tile.location.x}${tile.location.y}`;
        }
      );

      expect(result).toEqual('00011011');
    });

    it('should alter tile states', () => {
      grid.forEachTile(
        (tile) => {
          tile.name = `${tile.location.x}${tile.location.y}`;
        }
      );

      expect(grid.get({ x: 0, y: 1 }).name).toEqual('01');
    });
  });

  describe('getAdjacentTiles', () => {
    beforeEach(() => {
      grid = new SquareGrid(TestTile, 3, 3);
    });

    it('should get 9 tiles around the central tile', () => {
      const centralTile = grid.get({ x: 1, y: 1 });
      const result = grid.getAdjacentTiles(centralTile);

      expect(result.length).toEqual(8);
    });

    it('should get 3 tiles in the corner', () => {
      const cornerTile = grid.get({ x: 0, y: 0 });
      const result = grid.getAdjacentTiles(cornerTile);

      expect(result.length).toEqual(3);
    });
  });

  describe('get', () => {
    it('should get a tile by its location', () => {
      expect(grid.get({ x: 1, y: 1 })).toEqual({ location: { x: 1, y: 1 } });
    });
  });
});
