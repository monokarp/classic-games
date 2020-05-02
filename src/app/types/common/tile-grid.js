import { isEqual } from 'lodash';

export class TileGrid {
  constructor(
    tileType,
    rowCount,
    colCount
  ) {
    this.tileType = tileType;
    this.size = { rowCount, colCount };

    this.resetState();
  }

  resetState() {
    this.state =
      Array.from(Array(this.size.rowCount),
        (v, row) =>
          Array.from(Array(this.size.colCount),
            (_v, col) =>
              new this.tileType(row, col)
          )
      );
  }

  forEachTile(callback) {
    this.state.forEach(row =>
      row.forEach(tile => callback(tile))
    );
  }

  getAdjacentTiles(tile) {
    const { x, y } = tile.location;

    const tileRefs = [];

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        const currentLocation = { x: i, y: j };

        if (
          !this.outOfRange(currentLocation)
          && !isEqual(currentLocation, tile.location)
        ) {
          tileRefs.push(this.get(currentLocation));
        }
      }
    }

    return tileRefs.filter(Boolean);
  }

  get(location) {
    return this.state[location.x][location.y];
  }

  outOfRange({ x, y }) {
    return x < 0
      || y < 0
      || x >= this.size.rowCount
      || y >= this.size.colCount;
  }
}
