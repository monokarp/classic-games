export class TileGrid {
  constructor(
    tileType,
    rowCount,
    colCount,
  ) {
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
    const tileRefs = [];



    return tileRefs;
  }

  get(location) {
    return this.state[location.x][location.y];
  }
};
