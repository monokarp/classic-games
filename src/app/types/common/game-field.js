export class TileGrid {
  constructor(
    tileType,
    rowCount,
    colCount,
  ) {
    this.rows = rowCount;
    this.cols = colCount;

    this.tileGrid =
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

  }

  getAdjacentTiles(location) {
    return [];
  }

  get(location) {
    return this.tileGrid[location.x][location.y];
  }

  set(location, newState) {
    this.tileGrid[location.x][location.y].state = newState;
  }
};
