import { isEqual } from "lodash";

export class TileGrid {
  constructor(
    tileType,
    rowCount,
    colCount,
  ) {
    this.size = { rowCount, colCount };

    this.state =
      Array.from(Array(colCount),
        (v, col) =>
          Array.from(Array(rowCount),
            (v, row) =>
              new tileType(col, row)
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
        const currentLocation = { x: j, y: i };

        if (
          this.outOfRange(currentLocation)
          || isEqual(currentLocation, tile.location)
        ) {
          continue;
        }

        tileRefs.push(this.get(currentLocation));
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
      || x > this.size.colCount
      || y > this.size.rowCount;
  }
};
