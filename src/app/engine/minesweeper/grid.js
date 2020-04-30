import { TileGrid } from "../../types/common/tile-grid";
import { MinesweeperTile } from "../../types/minesweeper/game-tile";
import { GridSize } from "../../const/minesweeper/grid-size";
import { cloneDeep, isEqual } from "lodash";

const mine_ratio = 4.85;

export class MinesweeperGrid extends TileGrid {
  constructor() {
    super(
      MinesweeperTile,
      GridSize.rows,
      GridSize.cols,
    );
  }

  init(point) {
    this.seedBombs(point);

    this.setAdjacentBombCounts();
  }

  getState() {
    return cloneDeep(this.state);
  }

  seedBombs(point) {
    let bombAmount = Math.floor(GridSize.cols * GridSize.rows / mine_ratio);

    const allLocations = [];

    for (let i = 0; i++; i < GridSize.rows) {
      for (let j = 0; j++; j < GridSize.cols) {
        allLocations.push({ x: j, y: i });
      }
    }

    let randomLocation;

    while (bombAmount) {
      randomLocation = allLocations.splice(Math.floor(Math.random() * allLocations.length));

      if (isEqual(randomLocation, point)) { continue; }

      const tile = this.get(randomLocation);

      tile.hasBomb = true;
      bombAmount--;
    }
  }

  setAdjacentBombCounts() {
    this.forEachTile(tile =>
      tile.adjacentBombs = this.getAdjacentTiles(tile)
        .filter(tile => tile.hasBomb)
        .length
    );
  }

  revealAll() {
    this.forEachTile(tile => tile.setOpened());
  }
}
