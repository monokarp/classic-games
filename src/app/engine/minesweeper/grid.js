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

    for (let i = 0; i < GridSize.rows; i++) {
      for (let j = 0; j < GridSize.cols; j++) {
        allLocations.push({ x: j, y: i });
      }
    }

    let randomLocation;

    while (bombAmount) {
      randomLocation = allLocations.splice(Math.floor(Math.random() * allLocations.length),1)[0];

      if (isEqual(randomLocation, point)) { continue; }

      const tile = this.get(randomLocation);

      tile.hasBomb = true;
      bombAmount--;
    }
  }

  setAdjacentBombCounts() {
    this.forEachTile(tile =>
      tile.adjacentBombs = this.getAdjacentTiles(tile)
        .filter(adjacent => adjacent.hasBomb)
        .length
    );
  }

  revealAll() {
    this.forEachTile(tile => tile.setOpened());
  }
}
