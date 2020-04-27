export class TileGrid {
  constructor(
    tileType,
    rowCount,
    colCount,
  ) {
    this.rows = rowCount;
    this.cols = colCount;

    this.grid =
      Array.from(Array(colCount),
        (v, col) =>
          Array.from(Array(rowCount),
            (v, row) =>
              new tileType(col, row)
          )
      );
  }

  getTilesAmount() {
    return this.cols * this.rows;
  }

  getRandomTile() {
    const random = max => Math.floor(Math.random() * max);

    return this.get({
      x: random(this.cols),
      y: random(this.rows)
    });
  }

  forEachTile(callback) {
    this.grid.forEach(row =>
      row.forEach(tile => callback(tile))
    );
  }

  getAdjacentTiles(tile) {
    const tileRefs = [];



    return tileRefs;
  }

  get(location) {
    return this.grid[location.x][location.y];
  }

  set(location, newState) {
    this.grid[location.x][location.y].state = newState;
  }
};
